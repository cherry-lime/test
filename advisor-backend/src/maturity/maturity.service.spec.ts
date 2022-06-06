import { Test, TestingModule } from '@nestjs/testing';
import { MaturityService } from './maturity.service';

describe('MaturityService', () => {
  let service: MaturityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaturityService],
    }).compile();

    service = module.get<MaturityService>(MaturityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
