import { Module } from '@nestjs/common';
import { GeminiService } from './services/gemini.service';
import { GenerativeAiService } from './services/generative-ai.service';

@Module({
  providers: [GeminiService, GenerativeAiService],
  exports: [GeminiService, GenerativeAiService],
})
export class AiModule {}
