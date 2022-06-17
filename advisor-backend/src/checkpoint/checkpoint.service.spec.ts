import { Test, TestingModule } from '@nestjs/testing';
import { mockPrisma } from 'src/prisma/mock/mockPrisma';
import { PrismaService } from '../prisma/prisma.service';
import { CheckpointService } from './checkpoint.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('CheckpointService', () => {
  let service: CheckpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckpointService],
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

    service = module.get<CheckpointService>(CheckpointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
