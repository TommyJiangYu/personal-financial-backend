import { Module } from '@nestjs/common';
import { LineConnectorController } from './line-connector.controller';
import { LineConnectorService } from './line-connector.service';

@Module({
  controllers: [LineConnectorController],
  providers: [LineConnectorService],
})
export class LineConnectorModule {}
