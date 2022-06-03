import { Test, TestingModule } from '@nestjs/testing';
import { TemplateController } from './template.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { aTemplate, updateTemplate } from '../prisma/mock/mockTemplate';
import { TemplateService } from './template.service';
import { updateTemplateDto } from './template.service.spec';

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
            createTemplate: jest.fn().mockResolvedValue(aTemplate),
            getTemplate: jest.fn().mockResolvedValue(aTemplate),
            updateTemplate: jest.fn().mockResolvedValue(updateTemplate),
            getAllTemplates: jest.fn().mockResolvedValue([aTemplate]),
            cloneTemplate: jest.fn().mockResolvedValue(aTemplate),
            deleteTemplate: jest.fn().mockResolvedValue(aTemplate),
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
        templateController.createTemplate({
          template_name: 'test',
          template_type: 'INDIVIDUAL',
        })
      ).resolves.toBe(aTemplate);
    });
  });

  describe('getTemplate', () => {
    it('Should return the found template', async () => {
      expect(templateController.getTemplate(1)).resolves.toBe(aTemplate);
    });
  });

  describe('updateTemplate', () => {
    it('Should return the updated template', async () => {
      expect(
        templateController.updateTemplate(1, updateTemplateDto)
      ).resolves.toBe(updateTemplate);
    });
  });

  describe('deleteTemplate', () => {
    it('Should return the deleted template', async () => {
      expect(templateController.deleteTemplate(1)).resolves.toBe(aTemplate);
    });
  });

  describe('getAllTemplates', () => {
    it('Should return all templates', async () => {
      expect(templateController.getAllTemplates()).resolves.toEqual(
        expect.arrayContaining([aTemplate])
      );
    });
  });

  describe('cloneTemplate', () => {
    it('Should return the cloned template', async () => {
      expect(templateController.cloneTemplate(1)).resolves.toBe(aTemplate);
    });
  });
});
