import { Test, TestingModule } from '@nestjs/testing';
import { MaturityController } from './maturity.controller';
import { MaturityService } from './maturity.service';

describe('MaturityController', () => {
  let controller: MaturityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaturityController],
      providers: [MaturityService],
    }).compile();

    controller = module.get<MaturityController>(MaturityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
