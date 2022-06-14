import { Test, TestingModule } from '../../node_modules/@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { aUser } from '../prisma/mock/mockUser';
import { NotFoundException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    process.env = {
      DATABASE_URL: 'postgres://localhost:5432/test',
      JWT_SECRET: 'mycustomuselongsecret',
      EXPIRESIN: '60 days',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
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

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUser', () => {
    it('Should return the found users', async () => {
      expect(userService.getUser(1)).resolves.toBe(aUser);
    });
    //it('should reject if username is not found', async() => {
    //  jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    //  expect(userService.getUser(3)).rejects.toThrowError(NotFoundException);
    //})
  });

  describe('CreateUsers', () => {
    //it('Should return the found users', async () => {
    //  expect(userService.getUser(1)).resolves.toBe(aUser);

    it('Should throw NotFoundException if no user is found', async () => {
      jest.spyOn(prisma.user, 'findFirst').mockReturnValueOnce(null);
      expect(userService.getUser(2)).rejects.toThrow(NotFoundException);
    });
  });
});
