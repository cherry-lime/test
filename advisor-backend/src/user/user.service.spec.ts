import { Test, TestingModule } from '../../node_modules/@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

// Mock users array
const userArray = [
  {
    user_id: 1,
    password_hash: 'fdsfdsfds',
  },
  {
    user_id: 2,
    password_hash: 'fdsfdsdfdfdsdsfss',
  },
];
// Mock single user
const aUser = userArray[0];

// Mock prisma service
const mockPrisma = {
  user: {
    findMany: jest.fn().mockResolvedValue(userArray),
    findUnique: jest.fn().mockResolvedValue(aUser),
    findFirst: jest.fn().mockResolvedValue(aUser),
    findOne: jest.fn().mockResolvedValue(aUser),
    create: jest.fn().mockResolvedValue(aUser),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(aUser),
    delete: jest.fn().mockResolvedValue(aUser),
  },
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    process.env = {
      DATABASE_URL: 'postgres://localhost:5432/test',
      JWT_SECRET: "mycustomuselongsecret",
      EXPIRESIN: "1h"
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
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers', () => {
    it('Should return the found users', async () => {
      expect(userService.getUser(1)).resolves.toBe(aUser);
    });
  });

  describe('CreateUsers', () => {
    it('Should return the found users', async () => {
      expect(userService.getUser(1)).resolves.toBe(aUser);
    });
  });
});
