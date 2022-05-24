import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const mockUser = {
  user_id: 1,
  password_hash: 'fdsfdsfds',
};

/**
 * Test user controller
 */
describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            getUser: jest.fn().mockResolvedValue(mockUser),
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
      expect(userController.getUser(1)).resolves.toBe(mockUser);
    });
  });
});
