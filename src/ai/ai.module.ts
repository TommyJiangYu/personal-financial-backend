import { Module } from '@nestjs/common';
import { SecurityLogger } from './logger/security.logger';
import { PromptSanitizationPipe } from './pipes/prompt-sanitization.pipe';
import { GeminiService } from './services/gemini.service';
import { OcrFormatService } from './services/ocr-format.service';
import { SlipReader } from './services/slip-reader.service';
import { TextGenerator } from './services/text-generator.service';

@Module({
  providers: [
    GeminiService,
    TextGenerator,
    SlipReader,
    OcrFormatService,
    SecurityLogger,
    PromptSanitizationPipe,
  ],
  exports: [TextGenerator, SlipReader],
})
export class AiModule {}
