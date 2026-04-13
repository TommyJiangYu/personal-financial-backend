import { Injectable, Logger } from '@nestjs/common';
import { INSTRUCTION_ROLE, PROMPT_TYPE } from '../../enums/prompt.enum';
import { GetModelConfig } from '../../interfaces/gemini.interface';
import { promptGenerator } from '../../utils/prompt';
import { GeminiService } from './gemini.service';

@Injectable()
export class GenerativeAiService {
  private readonly logger = new Logger(GenerativeAiService.name);
  constructor(private readonly geminiService: GeminiService) {}

  async ask(text: string): Promise<string> {
    try {
      const customInstruction: GetModelConfig = {
        customInstruction: {
          systemInstruction: {
            role: INSTRUCTION_ROLE.SYSTEM,
            parts: [
              {
                text: promptGenerator(PROMPT_TYPE.GENERAL),
              },
            ],
          },
        },
      };

      const model = this.geminiService.getModel(customInstruction);

      const result = await model.generateContent(text);
      return result.response.text();
    } catch (error) {
      this.logger.error(
        'Error in textToSpeech:',
        error instanceof Error ? error.stack : error,
      );
      throw error;
    }
  }
}
