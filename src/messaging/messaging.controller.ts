import { webhook } from '@line/bot-sdk';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LineSignatureGuard } from './guards/line-signature.guard';
import { MessagingService } from './services/messaging.service';

@Controller('messaging')
export class MessagingController {
  private readonly logger = new Logger(MessagingController.name);

  constructor(private readonly messagingService: MessagingService) {}

  @Post('/webhook')
  @UseGuards(LineSignatureGuard)
  @HttpCode(HttpStatus.OK)
  handleWebhook(@Body() body: webhook.CallbackRequest): string {
    void this.processEvents(body.events);

    return 'OK';
  }

  private async processEvents(events: webhook.Event[]): Promise<void> {
    try {
      await this.messagingService.handleEvents(events);
    } catch {
      this.logger.error('Error processing webhook events');
    }
  }
}
