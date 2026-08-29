import { Injectable, Logger } from '@nestjs/common';

export type SecurityEventType =
  | 'regex_injection_detected'
  | 'encoding_suspicious'
  | 'gemini_safety_block'
  | 'output_leak_detected';

@Injectable()
export class SecurityLogger {
  private readonly logger = new Logger('SECURITY');

  logInjectionAttempt(
    eventType: SecurityEventType,
    matchedPattern?: string,
  ): void {
    this.logger.warn(
      `[SECURITY][${eventType}]` +
        (matchedPattern ? ` Pattern:${matchedPattern}` : ''),
    );
  }

  logGeminiBlock(safetyRatings: unknown): void {
    this.logger.warn(
      `[SECURITY][gemini_safety_block] Response blocked by Gemini API | ` +
        `Ratings: ${JSON.stringify(safetyRatings)}`,
    );
  }

  logOutputLeak(patternLabel: string): void {
    this.logger.warn(
      `[SECURITY][output_leak_detected] Pattern "${patternLabel}" found in AI response — redacted before sending to user`,
    );
  }
}
