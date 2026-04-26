import { Module } from '@nestjs/common';
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
    OcrFormatService,
    SecurityLogger,
    PromptSanitizationPipe,
  ],
  exports: [GeminiService, GenerativeAiService, OcrService],
})
export class AiModule {}
