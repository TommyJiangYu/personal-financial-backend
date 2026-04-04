import { Module } from '@nestjs/common';
import { LineConnectorController } from './line-connector.controller';
import { LineConnectorService } from './line-connector.service';
import { LineSignatureGuard } from './guards/line-signature.guard';

@Module({
  controllers: [LineConnectorController],
  providers: [LineConnectorService, LineSignatureGuard],
})
export class LineConnectorModule {}
