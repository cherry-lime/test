import { Test, TestingModule } from '@nestjs/testing';
import { aAssessment } from '../prisma/mock/mockAssessment';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';

const moduleMocker = new ModuleMocker(global);

describe('AssessmentController', () => {
  let assessmentController: AssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
    })
      .useMocker((token) => {
        if (token === AssessmentService) {
          return {
            create: jest.fn().mockResolvedValue(aAssessment),
            findAll: jest.fn().mockResolvedValue([aAssessment]),
            findOne: jest.fn().mockResolvedValue(aAssessment),
            update: jest.fn().mockResolvedValue(aAssessment),
            delete: jest.fn().mockResolvedValue(aAssessment),
            complete: jest.fn().mockResolvedValue(aAssessment),
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

    assessmentController =
      module.get<AssessmentController>(AssessmentController);
  });

  it('should be defined', () => {
    expect(assessmentController).toBeDefined();
  });

  describe('create', () => {
    it('Should return the created assessment', async () => {
      expect(assessmentController.create(aAssessment, undefined)).resolves.toBe(
        aAssessment
      );
    });
  });

  describe('findAll', () => {
    it('Should return all assessments', async () => {
      expect(assessmentController.findAll()).resolves.toEqual([aAssessment]);
    });
  });

  describe('findOne', () => {
    it('Should return the assessment', async () => {
      expect(assessmentController.findOne(1)).resolves.toBe(aAssessment);
    });
  });

  describe('update', () => {
    it('Should return the updated assessment', async () => {
      expect(assessmentController.update(1, aAssessment)).resolves.toBe(
        aAssessment
      );
    });
  });

  describe('delete', () => {
    it('Should return the deleted assessment', async () => {
      expect(assessmentController.delete(1)).resolves.toBe(aAssessment);
    });
  });

  describe('complete', () => {
    it('Should return the completed assessment', async () => {
      expect(assessmentController.complete(1)).resolves.toBe(aAssessment);
    });
  });
});
