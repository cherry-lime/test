import { Test, TestingModule } from '../../node_modules/@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { loginDto, mockLogin, mockLogout, mockUser, registerDto, userinfo } from '../prisma/mock/mockAuthController';
const moduleMocker = new ModuleMocker(global);

var ejs = require('ejs');
var MockExpressResponse = require('mock-express-response');

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    process.env = {
      DATABASE_URL: 'postgres://localhost:5432/test',
      JWT_SECRET: 'mycustomuselongsecret',
      EXPIRESIN: '60 days',
    };
    //const mock_AuthGuard: CanActivate = {canActivate: jest.fn(() => true)};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return {
            register: jest.fn().mockResolvedValue(mockUser),
            login: jest.fn().mockResolvedValue(mockLogin),
            logout: jest.fn().mockResolvedValue(mockLogout),
            getLoggedUser: jest.fn().mockResolvedValue(userinfo)
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
      //.overrideGuard(AuthGuard).useValue(mock_AuthGuard)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    // Basic response
    var response = new MockExpressResponse();
    it('Should return the created user', async () => {
      expect(authController.register(registerDto, response)).resolves.toBe(
        mockUser
      );
    });
  });

  describe('login', () => {
    // Basic response
    var response = new MockExpressResponse();
    it('Should return a message showing a successful login', async () => {
      expect(authController.login(loginDto, response)).resolves.toBe(
        mockLogin
      );
    });
  });

  describe('logout', () => {
    // Basic response
    var response = new MockExpressResponse();
    it('Should return a message showing a successful logout', async () => {
      expect(authController.logout(response)).resolves.toBe(
        mockLogout
      );
    });
  });

  describe('get a user', () => {
    it('Should return user information', async () => {
      expect(authController.getLoggedUser(userinfo)).resolves.toBe(
        userinfo
      );
    });
  });
});
