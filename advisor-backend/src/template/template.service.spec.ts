import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateService } from './template.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { aTemplate } from '../prisma/mock/mockTemplate';
import { AssessmentType } from '@prisma/client';

const moduleMocker = new ModuleMocker(global);

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
});
