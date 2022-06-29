import { Test } from '@nestjs/testing';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { PrismaService } from '../prisma/prisma.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { FeedbackModule } from './feedback.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

const moduleMocker = new ModuleMocker(global);

describe('FeedbackModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [FeedbackModule],
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

    expect(module).toBeDefined();
    expect(module.get(FeedbackController)).toBeInstanceOf(FeedbackController);
    expect(module.get(FeedbackService)).toBeInstanceOf(FeedbackService);
  });
});
