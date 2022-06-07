import { Test, TestingModule } from '@nestjs/testing';
import { SubareaService } from './subarea.service';

describe('SubareaService', () => {
  let service: SubareaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubareaService],
    }).compile();

    service = module.get<SubareaService>(SubareaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
