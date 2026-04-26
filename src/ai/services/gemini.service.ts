import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_SAFETY_SETTINGS } from '../constants/config';
import { GetModelConfig } from '../interfaces/gemini.interface';

@Injectable()
export class GeminiService {
  private readonly geminiClient: GoogleGenerativeAI;
  private readonly defaultAiModel: string;

  constructor(private readonly configService: ConfigService) {
    this.geminiClient = new GoogleGenerativeAI(
      this.configService.get<string>('GOOGLE_API_KEY') || '',
    );
    this.defaultAiModel = this.configService.get<string>('GEMINI_MODEL') || '';
  }

  getModel(config: GetModelConfig) {
    const model = this.geminiClient.getGenerativeModel({
      model: config.aiModel ? config.aiModel : this.defaultAiModel,
      safetySettings: DEFAULT_SAFETY_SETTINGS,
      ...config.customInstruction,
    });

    return model;
  }
}
