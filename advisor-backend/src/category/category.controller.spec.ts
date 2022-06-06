import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { aCategory } from '../prisma/mock/mockCategory';

const moduleMocker = new ModuleMocker(global);

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
    })
      .useMocker((token) => {
        if (token === CategoryService) {
          return {
            findOne: jest.fn().mockResolvedValue(aCategory),
            update: jest.fn().mockResolvedValue(aCategory),
            delete: jest.fn().mockResolvedValue(aCategory),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('Should return the category', async () => {
      expect(await controller.findOne(1)).toEqual(aCategory);
    });
  });

  describe('update', () => {
    it('Should return the updated category', async () => {
      expect(await controller.update(1, {})).toEqual(aCategory);
    });
  });

  describe('delete', () => {
    it('Should return the deleted category', async () => {
      expect(await controller.delete(1)).toEqual(aCategory);
    });
  });
});
