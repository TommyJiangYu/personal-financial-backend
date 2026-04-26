/*
 * MessagingService = "What to do when LINE sends us something" — it orchestrates your business domain.
 */

import { webhook } from '@line/bot-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { GenerativeAiService } from '../../ai/services/generative-ai.service';
import { OcrService } from '../../ai/services/ocr.service';
import { REPLY_MESSAGE } from '../enums/reply-message.enum';
import { SlipData } from '../interfaces/messing.interface';
import { LineService } from './line.service';

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);

  constructor(
    private readonly lineService: LineService,
    private readonly ocrService: OcrService,
    private readonly generativeAiService: GenerativeAiService,
  ) {}

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
      const result = await this.generativeAiService.ask(textMessage.text);
      await this.lineService.replyText(replyToken || '', result);
    } else if (message.type === 'image') {
      this.logger.log(`Received image message with ID: ${message.id}`);

      try {
        const stream = await this.lineService.getMessageContentStream(
          event?.message?.id,
        );

        const chunks: Uint8Array[] = [];

        // 2. ทยอยอ่านข้อมูลจาก Stream เข้าไปใน Array
        for await (const chunk of stream) {
          chunks.push(chunk);
        }

        // 3. รวม Chunks ทั้งหมดให้กลายเป็น Buffer ก้อนเดียว
        const imageBuffer = Buffer.concat(chunks);

        // 4. ส่ง Buffer ไปให้ OCR Service ประมวลผล
        const slipResult = await this.ocrService.scanBankSlip(
          imageBuffer,
          'image/jpeg',
        );

        // 5. ตอบกลับเมื่ออ่านเสร็จ
        if (slipResult && slipResult.amount != null) {
          const replyMessage = this.slipMessageGenerator(slipResult);

          await this.lineService.replyText(replyToken || '', replyMessage);
        } else {
          await this.lineService.replyText(
            replyToken || '',
            REPLY_MESSAGE.UNKNOWN_MESSAGE,
          );
        }
      } catch (error) {
        this.logger.error(
          'Error processing image',
          error instanceof Error ? error.stack : error,
        );
        await this.lineService.replyText(
          replyToken || '',
          REPLY_MESSAGE.ERROR_MESSAGE,
        );
      }
    } else {
      await this.lineService.replyText(
        replyToken || '',
        `เฮาได้รับ ${message.type} message แล้วเน้อ`,
      );
    }
  }

  private async handleFollowEvent(event: webhook.FollowEvent): Promise<void> {
    const userId =
      event?.source?.type === 'user' ? event?.source?.userId : 'unknown';
    this.logger.log(`New follower: ${userId}`);

    await this.lineService.replyText(
      event?.replyToken,
      REPLY_MESSAGE.WELCOME_MESSAGE,
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

    await this.lineService.replyText(
      event?.replyToken || '',
      `Postback received: ${event.postback.data}`,
    );
  }

  private slipMessageGenerator(slipData: SlipData): string {
    if (!slipData) {
      return '❌ ไม่สามารถอ่านสลิปได้';
    }

    const { sender, receiver, amount, note, refNo, date, bankName } = slipData;

    return (
      `✅ อ่านสลิปสำเร็จ!\n` +
      `1. จาก: ${sender || 'ไม่ทราบ'} (${bankName || '-'})\n` +
      `2. ถึง: ${receiver || 'ไม่ทราบ'}\n` +
      `3. จำนวนเงิน: ${amount} บาท\n` +
      `4. Note: ${note || '-'}\n` +
      `5. เลขที่อ้างอิง: ${refNo || '-'}\n` +
      `6. วันที่ทำรายการ: ${date || '-'}`
    );
  }
}
