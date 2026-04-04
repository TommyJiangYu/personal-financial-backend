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
import { LineConnectorService } from './line-connector.service';

@Controller('line-connector')
export class LineConnectorController {
  private readonly logger = new Logger(LineConnectorController.name);

  constructor(private readonly lineConnectorService: LineConnectorService) {}

  @Post('/webhook')
  @UseGuards(LineSignatureGuard)
  @HttpCode(HttpStatus.OK)
  handleWebhook(@Body() body: webhook.CallbackRequest): string {
    this.logger.log(
      `Received webhook: ${body.events.length} event(s) for destination: ${body.destination}`,
    );

    this.lineConnectorService.handleEvents(body.events).catch((error) => {
      this.logger.error('Error processing webhook events', error);
    });

    return 'OK';
  }
}
