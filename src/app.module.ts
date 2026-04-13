import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { MessagingModule } from './messaging/messaging.module';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ ConfigService ใช้ได้ทุก module โดยไม่ต้อง import ซ้ำ
      envFilePath: ['.env', '../.env'],
    }),
    MessagingModule,
    OcrModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
