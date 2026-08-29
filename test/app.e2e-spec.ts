import { INestApplication, Logger } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { Readable } from 'node:stream';
import { setTimeout as delay } from 'node:timers/promises';
import request from 'supertest';
import { App } from 'supertest/types';
import { SlipData } from '../src/messaging/interfaces/messing.interface';
import {
  createTestApplication,
  LineMessagingAdapter,
  SlipReaderAdapter,
  TextGeneratorAdapter,
} from './support/create-test-application';

const LINE_CHANNEL_SECRET = 'test-line-channel-secret';

interface OutboundReply {
  replyToken: string;
  text: string;
}

class FakeLineMessaging implements LineMessagingAdapter {
  readonly replies: OutboundReply[] = [];
  private readonly messageContent = new Map<string, Buffer>();

  async replyText(replyToken: string, text: string): Promise<void> {
    this.replies.push({ replyToken, text });
  }

  async getMessageContentStream(
    messageId?: string,
  ): Promise<AsyncIterable<Uint8Array>> {
    const content = messageId ? this.messageContent.get(messageId) : undefined;
    if (!content) {
      throw new Error('No image content configured for this test');
    }

    return Readable.from([content]);
  }

  setMessageContent(messageId: string, content: Buffer): void {
    this.messageContent.set(messageId, content);
  }

  async waitForReplies(expectedCount: number): Promise<void> {
    const deadline = Date.now() + 1_000;

    while (this.replies.length < expectedCount) {
      if (Date.now() >= deadline) {
        throw new Error(`Timed out waiting for ${expectedCount} LINE replies`);
      }

      await delay(1);
    }
  }

  reset(): void {
    this.replies.length = 0;
    this.messageContent.clear();
  }
}

class FakeTextGenerator implements TextGeneratorAdapter {
  reply = '';

  async generateReply(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 5));
    return this.reply;
  }
}

class FakeSlipReader implements SlipReaderAdapter {
  result: SlipData | undefined;

  async scanBankSlip(): Promise<SlipData> {
    if (!this.result) {
      throw new Error('No slip result configured for this test');
    }

    return this.result;
  }

  reset(): void {
    this.result = undefined;
  }
}

describe('LINE webhook (e2e)', () => {
  let app: INestApplication<App>;
  let originalLineChannelSecret: string | undefined;
  const lineMessaging = new FakeLineMessaging();
  const textGenerator = new FakeTextGenerator();
  const slipReader = new FakeSlipReader();

  beforeAll(async () => {
    originalLineChannelSecret = process.env.LINE_CHANNEL_SECRET;
    process.env.LINE_CHANNEL_SECRET = LINE_CHANNEL_SECRET;

    app = await createTestApplication({
      lineMessaging,
      textGenerator,
      slipReader,
    });
  });

  beforeEach(() => {
    lineMessaging.reset();
    textGenerator.reply = '';
    slipReader.reset();
  });

  afterAll(async () => {
    await app.close();

    if (originalLineChannelSecret === undefined) {
      delete process.env.LINE_CHANNEL_SECRET;
    } else {
      process.env.LINE_CHANNEL_SECRET = originalLineChannelSecret;
    }
  });

  it('processes a signed text webhook and exposes the outbound reply', async () => {
    textGenerator.reply = 'บันทึกรายการให้แล้ว';
    const body = {
      destination: 'test-destination',
      events: [
        {
          type: 'message',
          timestamp: 1_700_000_000_000,
          source: { type: 'user', userId: 'synthetic-user' },
          webhookEventId: 'event-text-1',
          deliveryContext: { isRedelivery: false },
          mode: 'active',
          replyToken: 'reply-text-1',
          message: {
            type: 'text',
            id: 'message-text-1',
            quoteToken: 'quote-text-1',
            text: 'จ่ายค่าอาหาร 120 บาท',
          },
        },
      ],
    };

    const response = await postSignedWebhook(body);
    await lineMessaging.waitForReplies(1);

    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
    expect(lineMessaging.replies).toEqual([
      { replyToken: 'reply-text-1', text: 'บันทึกรายการให้แล้ว' },
    ]);
  });

  it('processes a signed image webhook with fake provider adapters', async () => {
    lineMessaging.setMessageContent(
      'message-image-1',
      Buffer.from('synthetic-image'),
    );
    slipReader.result = {
      amount: 120,
      date: '2026-08-29',
      sender: 'Synthetic Sender',
      receiver: 'Synthetic Receiver',
      note: 'Synthetic Meal',
      refNo: 'SYNTHETIC-REF',
      bankName: 'Synthetic Bank',
    };
    const body = {
      destination: 'test-destination',
      events: [
        {
          type: 'message',
          timestamp: 1_700_000_000_000,
          source: { type: 'user', userId: 'synthetic-user' },
          webhookEventId: 'event-image-1',
          deliveryContext: { isRedelivery: false },
          mode: 'active',
          replyToken: 'reply-image-1',
          message: {
            type: 'image',
            id: 'message-image-1',
            quoteToken: 'quote-image-1',
            contentProvider: { type: 'line' },
          },
        },
      ],
    };

    const response = await postSignedWebhook(body);
    await lineMessaging.waitForReplies(1);

    expect(response.status).toBe(200);
    expect(lineMessaging.replies).toEqual([
      {
        replyToken: 'reply-image-1',
        text:
          '✅ อ่านสลิปสำเร็จ!\n' +
          '1. จาก: Synthetic Sender (Synthetic Bank)\n' +
          '2. ถึง: Synthetic Receiver\n' +
          '3. จำนวนเงิน: 120 บาท\n' +
          '4. Note: Synthetic Meal\n' +
          '5. เลขที่อ้างอิง: SYNTHETIC-REF\n' +
          '6. วันที่ทำรายการ: 2026-08-29',
      },
    ]);
  });

  it('rejects an invalid LINE signature before orchestration', async () => {
    const rawBody = JSON.stringify({
      destination: 'test-destination',
      events: [],
    });

    const response = await request(app.getHttpServer())
      .post('/messaging/webhook')
      .set('Content-Type', 'application/json')
      .set('x-line-signature', 'invalid-signature')
      .send(rawBody);

    expect(response.status).toBe(401);
    expect(lineMessaging.replies).toEqual([]);
  });

  it('preserves follow, unfollow, and postback routing', async () => {
    const commonEvent = {
      timestamp: 1_700_000_000_000,
      source: { type: 'user', userId: 'synthetic-user' },
      deliveryContext: { isRedelivery: false },
      mode: 'active',
    };
    const body = {
      destination: 'test-destination',
      events: [
        {
          ...commonEvent,
          type: 'follow',
          webhookEventId: 'event-follow-1',
          replyToken: 'reply-follow-1',
        },
        {
          ...commonEvent,
          type: 'unfollow',
          webhookEventId: 'event-unfollow-1',
        },
        {
          ...commonEvent,
          type: 'postback',
          webhookEventId: 'event-postback-1',
          replyToken: 'reply-postback-1',
          postback: { data: 'synthetic-action=confirm' },
        },
      ],
    };

    const response = await postSignedWebhook(body);
    await lineMessaging.waitForReplies(2);

    expect(response.status).toBe(200);
    expect(lineMessaging.replies).toEqual([
      {
        replyToken: 'reply-follow-1',
        text: 'ยินดีต้อนรับเน้อ! 🎉\nมีอะหยังหื้อเกียช่วย บอกได้เน้อ',
      },
      {
        replyToken: 'reply-postback-1',
        text: 'Postback received: synthetic-action=confirm',
      },
    ]);
  });

  it('keeps financial payloads and LINE identities out of operational logs', async () => {
    const logSpies = [
      jest.spyOn(Logger.prototype, 'log'),
      jest.spyOn(Logger.prototype, 'debug'),
      jest.spyOn(Logger.prototype, 'warn'),
      jest.spyOn(Logger.prototype, 'error'),
    ];
    textGenerator.reply = 'synthetic-safe-reply';
    const commonEvent = {
      timestamp: 1_700_000_000_000,
      source: { type: 'user', userId: 'private-line-user-marker' },
      deliveryContext: { isRedelivery: false },
      mode: 'active',
    };
    const body = {
      destination: 'test-destination',
      events: [
        {
          ...commonEvent,
          type: 'message',
          webhookEventId: 'event-private-text',
          replyToken: 'reply-private-text',
          message: {
            type: 'text',
            id: 'private-message-id-marker',
            quoteToken: 'quote-private-text',
            text: 'private-financial-payload-marker',
          },
        },
        {
          ...commonEvent,
          type: 'follow',
          webhookEventId: 'event-private-follow',
          replyToken: 'reply-private-follow',
        },
        {
          ...commonEvent,
          type: 'postback',
          webhookEventId: 'event-private-postback',
          replyToken: 'reply-private-postback',
          postback: { data: 'private-postback-marker' },
        },
      ],
    };

    try {
      const response = await postSignedWebhook(body);
      await lineMessaging.waitForReplies(3);
      const loggedOutput = logSpies
        .flatMap((spy) => spy.mock.calls)
        .flat()
        .map(String)
        .join(' ');

      expect(response.status).toBe(200);
      expect(loggedOutput).not.toContain('private-line-user-marker');
      expect(loggedOutput).not.toContain('private-message-id-marker');
      expect(loggedOutput).not.toContain('private-financial-payload-marker');
      expect(loggedOutput).not.toContain('private-postback-marker');
    } finally {
      logSpies.forEach((spy) => spy.mockRestore());
    }
  });

  function postSignedWebhook(body: object) {
    const rawBody = JSON.stringify(body);
    const signature = createHmac('sha256', LINE_CHANNEL_SECRET)
      .update(rawBody)
      .digest('base64');

    return request(app.getHttpServer())
      .post('/messaging/webhook')
      .set('Content-Type', 'application/json')
      .set('x-line-signature', signature)
      .send(rawBody);
  }
});
