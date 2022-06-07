import { Test, TestingModule } from '@nestjs/testing';
import { SubareaController } from './subarea.controller';
import { SubareaService } from './subarea.service';

describe('SubareaController', () => {
  let controller: SubareaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubareaController],
      providers: [SubareaService],
    }).compile();

    controller = module.get<SubareaController>(SubareaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
