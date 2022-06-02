import { Test } from '@nestjs/testing';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { PrismaService } from '../prisma/prisma.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { UserModule } from './user.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const moduleMocker = new ModuleMocker(global);

describe('UserModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
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
    expect(module.get(UserController)).toBeInstanceOf(UserController);
    expect(module.get(UserService)).toBeInstanceOf(UserService);
  });
});
