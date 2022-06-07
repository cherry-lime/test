import { Test, TestingModule } from '@nestjs/testing';
import { TemplateController } from './template.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { aTemplate, updateTemplate } from '../prisma/mock/mockTemplate';
import { TemplateService } from './template.service';
import { updateTemplateDto } from './template.service.spec';
import { CategoryService } from '../category/category.service';
import { aCategory } from '../prisma/mock/mockCategory';

const moduleMocker = new ModuleMocker(global);

/**
 * Test template controller
 */
describe('TemplateController', () => {
  let templateController: TemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
    })
      .useMocker((token) => {
        if (token === TemplateService) {
          return {
            create: jest.fn().mockResolvedValue(aTemplate),
            findOne: jest.fn().mockResolvedValue(aTemplate),
            update: jest.fn().mockResolvedValue(updateTemplate),
            findAll: jest.fn().mockResolvedValue([aTemplate]),
            clone: jest.fn().mockResolvedValue(aTemplate),
            delete: jest.fn().mockResolvedValue(aTemplate),
          };
        }
        if (token === CategoryService) {
          return {
            create: jest.fn().mockResolvedValue(aCategory),
            findAll: jest.fn().mockResolvedValue([aCategory]),
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

    templateController = module.get<TemplateController>(TemplateController);
  });

  it('should be defined', () => {
    expect(templateController).toBeDefined();
  });

  describe('createTemplate', () => {
    it('Should return the created template', async () => {
      expect(
        templateController.create({
          template_type: 'INDIVIDUAL',
        })
      ).resolves.toBe(aTemplate);
    });
  });

  describe('getTemplate', () => {
    it('Should return the found template', async () => {
      expect(templateController.findOne(1)).resolves.toBe(aTemplate);
    });
  });

  describe('updateTemplate', () => {
    it('Should return the updated template', async () => {
      expect(templateController.update(1, updateTemplateDto)).resolves.toBe(
        updateTemplate
      );
    });
  });

  describe('deleteTemplate', () => {
    it('Should return the deleted template', async () => {
      expect(templateController.delete(1)).resolves.toBe(aTemplate);
    });
  });

  describe('getAllTemplates', () => {
    it('Should return all templates', async () => {
      expect(templateController.findAll()).resolves.toEqual(
        expect.arrayContaining([aTemplate])
      );
    });
  });

  describe('cloneTemplate', () => {
    it('Should return the cloned template', async () => {
      expect(templateController.clone(1)).resolves.toBe(aTemplate);
    });
  });

  describe('createCategory', () => {
    it('Should return the created category', async () => {
      expect(templateController.createCategory(1)).resolves.toBe(aCategory);
    });
  });

  describe('getAllCategories', () => {
    it('Should return all categories', async () => {
      expect(templateController.findAllCategories(1)).resolves.toEqual([
        aCategory,
      ]);
    });
  });
});
