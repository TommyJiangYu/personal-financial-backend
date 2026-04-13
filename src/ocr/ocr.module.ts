import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { OcrService } from './ocr.service';

@Module({
  imports: [AiModule],
  providers: [OcrService],
  exports: [OcrService],
})
export class OcrModule {}
