import { messagingApi, webhook } from '@line/bot-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineConnectorService {
  private readonly logger = new Logger(LineConnectorService.name);
  private readonly lineClient: messagingApi.MessagingApiClient;

  constructor(private readonly configService: ConfigService) {
    const { MessagingApiClient } = messagingApi;
    this.lineClient = new MessagingApiClient({
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
    const { message, replyToken, source } = event;

    this.logger.log(
      `Message from ${source?.type === 'user' ? source?.userId : 'unknown'}: [${message.type}]`,
    );

    if (message.type === 'text') {
      const textMessage = message;
      this.logger.log(`Text content: ${textMessage.text}`);

      // TODO: เปลี่ยนเป็น logic ที่ต้องการ
      await this.replyText(replyToken || '', 'คิงจะทักฮามาอะหยัง');
    } else if (message.type === 'image') {
      this.logger.log(`Received image message with ID: ${message.id}`);
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
