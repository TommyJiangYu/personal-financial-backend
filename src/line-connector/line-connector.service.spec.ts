import { Test, TestingModule } from '@nestjs/testing';
import { LineConnectorService } from './line-connector.service';

describe('LineConnectorService', () => {
  let service: LineConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineConnectorService],
    }).compile();

    service = module.get<LineConnectorService>(LineConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
