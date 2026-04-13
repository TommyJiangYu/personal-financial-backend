import { GenerationConfig } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { GeminiService } from '../ai/services/gemini.service';
import { PROMPT_TYPE } from '../enums/prompt.enum';
import { GetModelConfig } from '../interfaces/gemini.interface';
import { SlipData } from '../interfaces/messing.interface';
import { promptGenerator } from '../utils/prompt';
import { OcrFormatService } from './ocr-format.service';

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);

  constructor(
    private readonly geminiService: GeminiService,
    private readonly ocrFormatService: OcrFormatService,
  ) {}

  async scanBankSlip(fileBuffer: Buffer, mimeType: string) {
    const responseSchema = this.ocrFormatService.formatResponseSchema();
    const generationConfig: GenerationConfig = {
      responseMimeType: 'application/json',
      responseSchema: responseSchema,
    };

    const config: GetModelConfig = {
      customInstruction: {
        generationConfig,
      },
    };

    const model = this.geminiService.getModel(config);
    const customPrompt = promptGenerator(PROMPT_TYPE.SLIP_READER);

    const result = await model.generateContent([
      { inlineData: { data: fileBuffer.toString('base64'), mimeType } },
      customPrompt,
    ]);
    const responseText = result.response.text();
    this.logger.debug(`Gemini response: ${responseText}`);
    return JSON.parse(responseText) as SlipData;
  }
}
