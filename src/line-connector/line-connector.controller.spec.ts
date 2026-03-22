import { Test, TestingModule } from '@nestjs/testing';
import { LineConnectorController } from './line-connector.controller';

describe('LineConnectorController', () => {
  let controller: LineConnectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineConnectorController],
    }).compile();

    controller = module.get<LineConnectorController>(LineConnectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
