import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineConnectorModule } from './line-connector/line-connector.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ ConfigService ใช้ได้ทุก module โดยไม่ต้อง import ซ้ำ
      envFilePath: ['.env', '../.env'],
    }),
    LineConnectorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
