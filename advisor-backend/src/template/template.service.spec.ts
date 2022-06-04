import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateService } from './template.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { aTemplate, updateTemplate } from '../prisma/mock/mockTemplate';
import { AssessmentType } from '@prisma/client';
import { UpdateTemplateDto } from './dto/update-template.dto';
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

  describe('create', () => {
    it('Should return the created template', async () => {
      expect(
        templateService.create('test', AssessmentType.INDIVIDUAL)
      ).resolves.toBe(aTemplate);
    });

    it('Should reject if template name and type already exists', async () => {
      jest
        .spyOn(prisma.template, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });
      await expect(
        templateService.create('test', AssessmentType.INDIVIDUAL)
      ).rejects.toThrowError(ConflictException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.template, 'create')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(
        templateService.create('test', AssessmentType.INDIVIDUAL)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    it('Should return the found template', async () => {
      expect(templateService.findOne(1)).resolves.toBe(aTemplate);
    });

    it('Should reject if template not found', async () => {
      jest.spyOn(prisma.template, 'findUnique').mockResolvedValueOnce(null);
      expect(templateService.findOne(2)).rejects.toThrowError(
        NotFoundException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.template, 'findUnique')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(templateService.findOne(1)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('update', () => {
    it('Should return the found template', async () => {
      expect(templateService.update(1, updateTemplateDto)).resolves.toBe(
        updateTemplate
      );
    });

    it('Should reject if template not found', async () => {
      jest
        .spyOn(prisma.template, 'update')
        .mockRejectedValueOnce({ code: 'P2025' });
      expect(templateService.update(2, updateTemplateDto)).rejects.toThrowError(
        NotFoundException
      );
    });

    it('Should reject if template name and type are duplicate', async () => {
      jest
        .spyOn(prisma.template, 'update')
        .mockRejectedValueOnce({ code: 'P2002' });
      expect(templateService.update(1, updateTemplateDto)).rejects.toThrowError(
        ConflictException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.template, 'update')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(templateService.update(1, updateTemplateDto)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('findAll', () => {
    it('Should return all templates', async () => {
      expect(templateService.findAll()).resolves.toEqual([aTemplate]);
    });
  });

  describe('clone', () => {
    it('Should return the cloned template', async () => {
      expect(templateService.clone(1)).resolves.toBe(aTemplate);
    });

    it('Should reject if template not found', async () => {
      jest.spyOn(prisma.template, 'findUnique').mockReturnValueOnce(null);
      expect(templateService.clone(2)).rejects.toThrowError(NotFoundException);
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
      expect(templateService.clone(1)).resolves;
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.template, 'create')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(templateService.clone(1)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('delete', () => {
    it('Should return the deleted template', async () => {
      expect(templateService.delete(1)).resolves.toBe(aTemplate);
    });

    it('Should reject if template not found', async () => {
      jest.spyOn(prisma.template, 'delete').mockRejectedValueOnce({
        code: 'P2025',
      });
      expect(templateService.delete(2)).rejects.toThrowError(NotFoundException);
    });

    it('Should reject with unknown error', async () => {
      jest.spyOn(prisma.template, 'delete').mockRejectedValueOnce({
        code: 'TEST',
      });
      expect(templateService.delete(1)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });
});
