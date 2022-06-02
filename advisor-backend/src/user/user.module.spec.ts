import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { UserService } from './user.service';

const moduleMocker = new ModuleMocker(global);

describe('TemplateModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return Prisma;
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