import { Module } from '@nestjs/common';
import { LineConnectorModule } from './line-connector/line-connector.module';

@Module({
  imports: [LineConnectorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
