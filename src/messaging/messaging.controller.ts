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
import { MessagingService } from './messaging.service';

@Controller('messaging')
export class MessagingController {
  private readonly logger = new Logger(MessagingController.name);

  constructor(private readonly messagingService: MessagingService) {}

  @Post('/webhook')
  @UseGuards(LineSignatureGuard)
  @HttpCode(HttpStatus.OK)
  handleWebhook(@Body() body: webhook.CallbackRequest): string {
    this.messagingService.handleEvents(body.events).catch((error) => {
      this.logger.error('Error processing webhook events', error);
    });

    return 'OK';
  }
}
