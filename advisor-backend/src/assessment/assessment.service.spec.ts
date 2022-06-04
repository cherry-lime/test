import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { aAssessment } from '../prisma/mock/mockAssessment';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { PrismaService } from '../prisma/prisma.service';
import { AssessmentService } from './assessment.service';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('AssessmentService', () => {
  let assessmentService: AssessmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssessmentService],
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

    assessmentService = module.get<AssessmentService>(AssessmentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(assessmentService).toBeDefined();
  });

  describe('create', () => {
    it('Should return the created assessment', async () => {
      expect(assessmentService.create(aAssessment)).resolves.toBe(aAssessment);
    });

    it('Should throw ConflictException on conflict', async () => {
      jest
        .spyOn(prisma.assessment, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });

      expect(assessmentService.create(aAssessment)).rejects.toThrowError(
        ConflictException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.assessment, 'create')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(assessmentService.create(aAssessment)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('findAll', () => {
    it('Should return all assessments', async () => {
      expect(assessmentService.findAll()).resolves.toEqual([aAssessment]);
    });
  });

  describe('findOne', () => {
    it('Should return the found assessment', async () => {
      expect(assessmentService.findOne(aAssessment.template_id)).resolves.toBe(
        aAssessment
      );
    });

    it('Should throw NotFoundException if not found', async () => {
      jest
        .spyOn(prisma.assessment, 'findFirst')
        .mockRejectedValueOnce({ code: 'P2001' });
      expect(
        assessmentService.findOne(aAssessment.template_id)
      ).rejects.toThrowError(NotFoundException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.assessment, 'findFirst')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(
        assessmentService.findOne(aAssessment.template_id)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('Should return the updated assessment', async () => {
      expect(
        assessmentService.update(aAssessment.assessment_id, aAssessment)
      ).resolves.toBe(aAssessment);
    });

    it('Should throw NotFoundException if not found', async () => {
      jest
        .spyOn(prisma.assessment, 'update')
        .mockRejectedValueOnce({ code: 'P2025' });
      expect(
        assessmentService.update(aAssessment.template_id, aAssessment)
      ).rejects.toThrowError(NotFoundException);
    });

    it('Should throw ConflictException if already exists', async () => {
      jest
        .spyOn(prisma.assessment, 'update')
        .mockRejectedValueOnce({ code: 'P2002' });
      expect(
        assessmentService.update(aAssessment.template_id, aAssessment)
      ).rejects.toThrowError(ConflictException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.assessment, 'update')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(
        assessmentService.update(aAssessment.template_id, aAssessment)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('delete', () => {
    it('Should return the deleted assessment', async () => {
      expect(assessmentService.delete(aAssessment.assessment_id)).resolves.toBe(
        aAssessment
      );
    });

    it('Should throw NotFoundException if not found', async () => {
      jest
        .spyOn(prisma.assessment, 'delete')
        .mockRejectedValueOnce({ code: 'P2025' });
      expect(
        assessmentService.delete(aAssessment.assessment_id)
      ).rejects.toThrowError(NotFoundException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.assessment, 'delete')
        .mockRejectedValueOnce({ code: 'TEST' });
      expect(
        assessmentService.delete(aAssessment.template_id)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });
});
