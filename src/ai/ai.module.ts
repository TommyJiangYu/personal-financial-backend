import { Module } from '@nestjs/common';
import { SLIP_READER, TEXT_GENERATOR } from './ai.tokens';
import { SecurityLogger } from './logger/security.logger';
import { PromptSanitizationPipe } from './pipes/prompt-sanitization.pipe';
import { GeminiService } from './services/gemini.service';
import { GenerativeAiService } from './services/generative-ai.service';
import { OcrFormatService } from './services/ocr-format.service';
import { OcrService } from './services/ocr.service';

@Module({
  providers: [
    GeminiService,
    GenerativeAiService,
    OcrService,
    {
      provide: TEXT_GENERATOR,
      useExisting: GenerativeAiService,
    },
    {
      provide: SLIP_READER,
      useExisting: OcrService,
    },
    OcrFormatService,
    SecurityLogger,
    PromptSanitizationPipe,
  ],
  exports: [TEXT_GENERATOR, SLIP_READER],
})
export class AiModule {}
