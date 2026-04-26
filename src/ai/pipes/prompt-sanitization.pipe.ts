import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { promptSchema, SanitizedPrompt } from '../schemas/prompt.schema';

@Injectable()
export class PromptSanitizationPipe implements PipeTransform {
  private readonly logger = new Logger(PromptSanitizationPipe.name);

  transform(value: unknown): SanitizedPrompt {
    const result = promptSchema.safeParse(value);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Invalid input';
      throw new BadRequestException(message);
    }

    const sanitized = result.data;

    if (this.containsSuspiciousEncoding(sanitized)) {
      this.logger.warn(
        '[SECURITY] Suspicious encoding pattern detected in input',
      );
      throw new BadRequestException('รูปแบบข้อมูลไม่ถูกต้องเน้อ');
    }

    return sanitized;
  }

  private containsSuspiciousEncoding(value: string): boolean {
    const base64Pattern = /[A-Za-z0-9+/]{40,}={0,2}/;
    const hexPattern = /[0-9A-Fa-f]{20,}/;

    return base64Pattern.test(value) || hexPattern.test(value);
  }
}
