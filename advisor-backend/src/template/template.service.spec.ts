import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateService } from './template.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { aTemplate, updateTemplate } from '../prisma/mock/mockTemplate';
import { AssessmentType } from '@prisma/client';
import { UpdateTemplateDto } from './dto/UpdateTemplateDto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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
  let prisma: PrismaService;

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
    prisma = module.get<PrismaService>(PrismaService);
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

    it('Should reject if template name and type already exists', async () => {
      jest
        .spyOn(prisma.template, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });
      await expect(
        templateService.createTemplate('test', AssessmentType.INDIVIDUAL)
      ).rejects.toThrowError(ConflictException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.template, 'create')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(
        templateService.createTemplate('test', AssessmentType.INDIVIDUAL)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('getTemplate', () => {
    it('Should return the found template', async () => {
      expect(templateService.getTemplate(1)).resolves.toBe(aTemplate);
    });

    it('Should reject if template not found', async () => {
      jest.spyOn(prisma.template, 'findFirst').mockReturnValueOnce(null);
      expect(templateService.getTemplate(2)).rejects.toThrowError(
        NotFoundException
      );
    });
  });

  describe('updateTemplate', () => {
    it('Should return the found template', async () => {
      expect(
        templateService.updateTemplate(1, updateTemplateDto)
      ).resolves.toBe(updateTemplate);
    });

    it('Should reject if template not found', async () => {
      jest
        .spyOn(prisma.template, 'update')
        .mockRejectedValueOnce({ code: 'P2025' });
      expect(
        templateService.updateTemplate(2, updateTemplateDto)
      ).rejects.toThrowError(NotFoundException);
    });

    it('Should reject if template name and type are duplicate', async () => {
      jest
        .spyOn(prisma.template, 'update')
        .mockRejectedValueOnce({ code: 'P2002' });
      expect(
        templateService.updateTemplate(1, updateTemplateDto)
      ).rejects.toThrowError(ConflictException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.template, 'update')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(
        templateService.updateTemplate(1, updateTemplateDto)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('getAllTemplates', () => {
    it('Should return all templates', async () => {
      expect(templateService.getAllTemplates()).resolves.toEqual([aTemplate]);
    });
  });

  describe('cloneTemplate', () => {
    it('Should return the cloned template', async () => {
      expect(templateService.cloneTemplate(1)).resolves.toBe(aTemplate);
    });

    it('Should reject if template not found', async () => {
      jest.spyOn(prisma.template, 'findFirst').mockReturnValueOnce(null);
      expect(templateService.cloneTemplate(2)).rejects.toThrowError(
        NotFoundException
      );
    });

    it('Should create template with (copy) (copy) if copy exists', async () => {
      jest
        .spyOn(prisma.template, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });
      jest
        .spyOn(prisma.template, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });
      const cloneTemplate = { ...aTemplate };
      cloneTemplate.template_name = `test (Copy) (Copy)`;
      delete cloneTemplate.template_id;
      expect(templateService.cloneTemplate(1)).resolves;
    });
  });

  describe('deleteTemplate', () => {
    it('Should return the deleted template', async () => {
      expect(templateService.deleteTemplate(1)).resolves.toBe(aTemplate);
    });

    it('Should reject if template not found', async () => {
      jest.spyOn(prisma.template, 'delete').mockRejectedValueOnce({
        code: 'P2025',
      });
      expect(templateService.deleteTemplate(2)).rejects.toThrowError(
        NotFoundException
      );
    });
  });
});
