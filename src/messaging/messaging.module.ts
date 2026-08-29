import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { LineSignatureGuard } from './guards/line-signature.guard';
import { MessagingController } from './messaging.controller';
import { LINE_MESSAGING } from './messaging.tokens';
import { LineService } from './services/line.service';
import { MessagingService } from './services/messaging.service';

@Module({
  imports: [AiModule],
  controllers: [MessagingController],
  providers: [
    MessagingService,
    LineSignatureGuard,
    LineService,
    {
      provide: LINE_MESSAGING,
      useExisting: LineService,
    },
  ],
})
export class MessagingModule {}
