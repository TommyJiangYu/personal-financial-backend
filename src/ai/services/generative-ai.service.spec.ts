import { Test, TestingModule } from '@nestjs/testing';
import { GenerativeAiService } from './services/generative-ai.service';

describe('GenerativeAiService', () => {
  let service: GenerativeAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerativeAiService],
    }).compile();

    service = module.get<GenerativeAiService>(GenerativeAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
