import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { throttlerConfig } from './configs/throttler.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  ThrottlerModule.forRootAsync(throttlerConfig);
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}

async function start(): Promise<void> {
  try {
    await bootstrap();
  } catch {
    new Logger('Bootstrap').error('Application failed to start');
    process.exitCode = 1;
  }
}

void start();
