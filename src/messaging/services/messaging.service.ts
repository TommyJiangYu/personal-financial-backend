import { messagingApi, webhook } from '@line/bot-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OcrService } from '../../ocr/ocr.service';

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);
  private readonly lineClient: messagingApi.MessagingApiClient;
  private readonly lineBlobClient: messagingApi.MessagingApiBlobClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly ocrService: OcrService,
  ) {
    const { MessagingApiClient, MessagingApiBlobClient } = messagingApi;
    this.lineClient = new MessagingApiClient({
      channelAccessToken:
        this.configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN') || '',
    });
    this.lineBlobClient = new MessagingApiBlobClient({
      channelAccessToken:
        this.configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN') || '',
    });
  }

  async handleEvents(events: webhook.Event[]): Promise<void> {
    for (const event of events) {
      try {
        await this.handleEvent(event);
      } catch (error) {
        this.logger.error(
          `Error handling event type: ${event.type}`,
          error instanceof Error ? error.stack : error,
        );
      }
    }
  }

  private async handleEvent(event: webhook.Event): Promise<void> {
    this.logger.debug(`Processing event: ${event.type}`);

    switch (event.type) {
      case 'message':
        await this.handleMessageEvent(event);
        break;
      case 'follow':
        await this.handleFollowEvent(event);
        break;
      case 'unfollow':
        this.handleUnfollowEvent(event);
        break;
      case 'postback':
        await this.handlePostbackEvent(event);
        break;
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handleMessageEvent(event: webhook.MessageEvent): Promise<void> {
    const { message, replyToken } = event;

    if (message.type === 'text') {
      const textMessage = message;
      this.logger.log(`Text content: ${textMessage.text}`);
      const result = await this.ocrService.textToSpeech(textMessage.text);

      // TODO: เปลี่ยนเป็น logic ที่ต้องการ
      await this.replyText(replyToken || '', result);
    } else if (message.type === 'image') {
      this.logger.log(`Received image message with ID: ${message.id}`);

      try {
        // 1. ดาวน์โหลด Content ของรูปภาพเป็น ReadableStream
        const stream = await this.lineBlobClient.getMessageContent(message.id);
        const chunks: Buffer[] = [];

        // 2. ทยอยอ่านข้อมูลจาก Stream เข้าไปใน Array
        for await (const chunk of stream as any) {
          chunks.push(Buffer.from(chunk));
        }
        // 3. รวม Chunks ทั้งหมดให้กลายเป็น Buffer ก้อนเดียว
        const imageBuffer = Buffer.concat(chunks);

        // 4. ส่ง Buffer ไปให้ OCR Service ประมวลผล
        const slipResult = await this.ocrService.scanBankSlip(
          imageBuffer,
          'image/jpeg', // รูปภาพที่ได้จาก LINE มักจะเป็น JPEG
        );

        console.log('slipResult : ', slipResult);

        // 5. ตอบกลับเมื่ออ่านเสร็จ
        if (slipResult && slipResult.amount != null) {
          const { sender, receiver, amount, note, refNo, date, bankName } =
            slipResult;
          const replyMessage =
            `✅ อ่านสลิปสำเร็จ!\n` +
            `1. จาก: ${sender || 'ไม่ทราบ'} (${bankName || '-'})\n` +
            `2. ถึง: ${receiver || 'ไม่ทราบ'}\n` +
            `3. จำนวนเงิน: ${amount} บาท\n` +
            `4. Note: ${note || '-'}\n` +
            `5. เลขที่อ้างอิง: ${refNo || '-'}\n` +
            `6. วันที่ทำรายการ: ${date || '-'}`;

          await this.replyText(replyToken || '', replyMessage);
        } else {
          await this.replyText(
            replyToken || '',
            'เฮาบ่าเจอยอดเงินในรูปนี้เน่อ',
          );
        }
      } catch (error) {
        this.logger.error(
          'Error processing image',
          error instanceof Error ? error.stack : error,
        );
        await this.replyText(
          replyToken || '',
          'เกิดข้อผิดพลาดในการอ่านรูปครับ',
        );
      }
    } else {
      await this.replyText(
        replyToken || '',
        `ได้รับ ${message.type} message แล้วครับ`,
      );
    }
  }

  private async handleFollowEvent(event: webhook.FollowEvent): Promise<void> {
    const userId =
      event?.source?.type === 'user' ? event?.source?.userId : 'unknown';
    this.logger.log(`New follower: ${userId}`);

    await this.replyText(
      event?.replyToken,
      'ยินดีต้อนรับครับ! 🎉\nขอบคุณที่เพิ่มเป็นเพื่อน',
    );
  }

  private handleUnfollowEvent(event: webhook.UnfollowEvent) {
    const userId =
      event?.source?.type === 'user' ? event?.source?.userId : 'unknown';
    this.logger.log(`User unfollowed: ${userId}`);
  }

  private async handlePostbackEvent(
    event: webhook.PostbackEvent,
  ): Promise<void> {
    this.logger.log(`Postback data: ${event.postback.data}`);

    await this.replyText(
      event?.replyToken || '',
      `Postback received: ${event.postback.data}`,
    );
  }

  private async replyText(replyToken: string, text: string): Promise<void> {
    try {
      await this.lineClient.replyMessage({
        replyToken,
        messages: [{ type: 'text', text }],
      });
    } catch (error) {
      this.logger.error(
        'Error replying message',
        error instanceof Error ? error.stack : error,
      );
    }
  }
}
