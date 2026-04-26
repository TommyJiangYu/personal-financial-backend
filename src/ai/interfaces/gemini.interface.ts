import { Content, GenerationConfig, Part } from '@google/generative-ai';

export type SystemInstruction = string | Part | Content | undefined;

export interface CustomInstruction {
  systemInstruction?: SystemInstruction;
  generationConfig?: GenerationConfig;
}

export interface GetModelConfig {
  aiModel?: string;
  customInstruction?: CustomInstruction;
}
