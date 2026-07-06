import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';

export const throttlerConfig: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => [
    {
      ttl: config.get<number>('REQUEST_TTL_SECONDS', 3600),
      limit: config.get<number>('REQUEST_RATE_LIMIT', 1),
    },
  ],
};
