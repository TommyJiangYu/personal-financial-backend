import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // เปิด rawBody เพื่อให้ LINE Signature Guard เข้าถึง raw body ได้
    // NestJS จะเก็บ raw body ไว้ที่ req.rawBody แม้ว่าจะ parse JSON ไปแล้ว
    rawBody: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
