import { Module } from '@nestjs/common';
import { OcrModule } from '../ocr/ocr.module';
import { LineSignatureGuard } from './guards/line-signature.guard';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';

@Module({
  imports: [OcrModule],
  controllers: [MessagingController],
  providers: [MessagingService, LineSignatureGuard],
})
export class MessagingModule {}
