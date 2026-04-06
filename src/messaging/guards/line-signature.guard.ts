import { validateSignature } from '@line/bot-sdk';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

/**
 * Guard ที่ตรวจสอบ x-line-signature ของ webhook request
 * เพื่อยืนยันว่า request มาจาก LINE Platform จริงๆ
 *
 * ใช้ HMAC-SHA256 กับ raw body + channel secret
 * แล้วเปรียบเทียบกับ signature ใน header
 */
@Injectable()
export class LineSignatureGuard implements CanActivate {
  private readonly logger = new Logger(LineSignatureGuard.name);

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const signature = request.headers['x-line-signature'] as string;
    if (!signature) {
      this.logger.warn('Missing x-line-signature header');
      throw new UnauthorizedException('Missing header');
    }

    const channelSecret = this.configService.get<string>('LINE_CHANNEL_SECRET');

    if (!channelSecret) {
      this.logger.error('LINE_CHANNEL_SECRET is not configured');
      throw new UnauthorizedException('Server configuration error');
    }

    // ใช้ rawBody ที่ NestJS preserve ไว้ให้ (ต้อง enable rawBody: true ใน main.ts)
    const req = request as Request & { rawBody: Buffer };
    if (!req.rawBody) {
      this.logger.error(
        'Raw body is not available. Make sure rawBody is enabled in NestFactory.create()',
      );
      throw new UnauthorizedException('Unable to verify signature');
    }

    const isValid = validateSignature(req.rawBody, channelSecret, signature);

    if (!isValid) {
      this.logger.warn('Invalid LINE webhook signature');
      throw new UnauthorizedException('Invalid signature');
    }

    return true;
  }
}
