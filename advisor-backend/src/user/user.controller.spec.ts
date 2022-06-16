import { Test, TestingModule } from '../../node_modules/@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { aUser } from '../prisma/mock/mockUser';

const moduleMocker = new ModuleMocker(global);

/**
 * Test user controller
 */
describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    process.env = {
      DATABASE_URL: 'postgres://localhost:5432/test',
      JWT_SECRET: 'mycustomuselongsecret',
      EXPIRESIN: '60 days',
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            getUser: jest.fn().mockResolvedValue(aUser),
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

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUser', () => {
    it('Should return the found user', async () => {
      expect(userController.getUser(1)).resolves.toBe(aUser);
    });
  });
});
