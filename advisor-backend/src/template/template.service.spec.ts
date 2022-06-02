import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateService } from './template.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { aTemplate, updateTemplate } from '../prisma/mock/mockTemplate';
import { AssessmentType } from '@prisma/client';
import { UpdateTemplateDto } from './dto/UpdateTemplateDto';

const moduleMocker = new ModuleMocker(global);

export const updateTemplateDto: UpdateTemplateDto = {
  template_name: 'new_name',
  template_type: 'INDIVIDUAL',
  disabled: false,
  weight_range_min: 1,
  weight_range_max: 5,
  score_formula: 'avg(x)',
  include_no_answer: true,
};

describe('TemplateService', () => {
  let templateService: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return mockPrisma;
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

    templateService = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(templateService).toBeDefined();
  });

  describe('createTemplate', () => {
    it('Should return the created template', async () => {
      expect(
        templateService.createTemplate('test', AssessmentType.INDIVIDUAL)
      ).resolves.toBe(aTemplate);
    });
  });

  describe('getTemplate', () => {
    it('Should return the found template', async () => {
      expect(templateService.getTemplate(1)).resolves.toBe(aTemplate);
    });

    // TODO: Fix this test
    // it('Should reject if template not found', async () => {
    //   expect(templateService.getTemplate(2)).rejects.toThrow(NotFoundException);
    // });
  });

  describe('updateTemplate', () => {
    it('Should return the found template', async () => {
      expect(
        templateService.updateTemplate(1, updateTemplateDto)
      ).resolves.toBe(updateTemplate);
    });

    // TODO: Fix this test
    // it('Should reject if template not found', async () => {
    //   expect(templateService.updateTemplate(2, updateTemplateDto)).rejects.toThrow(NotFoundException);
    // });
  });

  describe('getAllTemplates', () => {
    it('Should return all templates', async () => {
      expect(templateService.getAllTemplates()).resolves.toEqual([aTemplate]);
    });
  });
});
