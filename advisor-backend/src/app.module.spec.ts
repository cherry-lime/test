import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { AppModule } from './app.module';
import { mockPrisma } from './prisma/mock/mockPrisma';
import { PrismaService } from './prisma/prisma.service';

const moduleMocker = new ModuleMocker(global);

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
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

    appModule = module.get<AppModule>(AppModule);
  });

  it('should compile the module', async () => {
    expect(appModule).toBeDefined();
  });
});
