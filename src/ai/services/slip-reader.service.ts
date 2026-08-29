import { GenerationConfig } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { SlipData } from '../../messaging/interfaces/messing.interface';
import { PROMPT_TYPE } from '../enums/prompt.enum';
import { GetModelConfig } from '../interfaces/gemini.interface';
import { promptGenerator } from '../utils/prompt';
import { GeminiService } from './gemini.service';
import { OcrFormatService } from './ocr-format.service';

@Injectable()
export class SlipReader {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly ocrFormatService: OcrFormatService,
  ) {}

  async scanBankSlip(fileBuffer: Buffer, mimeType: string): Promise<SlipData> {
    const responseSchema = this.ocrFormatService.formatResponseSchema();
    const generationConfig: GenerationConfig = {
      responseMimeType: 'application/json',
      responseSchema,
      temperature: 0,
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
    const responseText = result.response
      .text()
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .replace(/_/g, '');

    return JSON.parse(responseText) as SlipData;
  }
}
