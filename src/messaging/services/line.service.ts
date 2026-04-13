/*
 * LineService = "How to talk to LINE API" — it only knows about LINE SDK operations, nothing about your domain.
 */

import { messagingApi } from '@line/bot-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineService {
  private readonly logger = new Logger(LineService.name);
  private readonly lineClient: messagingApi.MessagingApiClient;
  private readonly lineBlobClient: messagingApi.MessagingApiBlobClient;

  constructor(private readonly configService: ConfigService) {
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

  async replyText(replyToken: string, text: string): Promise<void> {
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

  async getMessageContentStream(
    messageId: string,
  ): Promise<AsyncIterable<Uint8Array>> {
    try {
      // 1. ดาวน์โหลด Content ของรูปภาพเป็น ReadableStream
      const stream = (await this.lineBlobClient.getMessageContent(
        messageId,
      )) as AsyncIterable<Uint8Array>;

      return stream;
    } catch (error) {
      this.logger.error(
        'Error receiving image content',
        error instanceof Error ? error.stack : error,
      );

      throw new Error(`Error receiving image : ${messageId}`);
    }
  }
}
