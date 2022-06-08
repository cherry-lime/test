import { Test, TestingModule } from '../../node_modules/@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Role} from '@prisma/client';
import { AuthResponse } from './dto/auth-response.dto';
// import { AuthGuard } from './auth.guard';
// Random start and update date
const myStartDate: any = new Date();
const myEndDate: any = new Date();

const mockUser = {
  username: 'hearing_refused_musical',
  password: 'f894a202-2f5b-4a69-89f7-f7f8f28a9368',
};

const registerDto = {
  role: Role.ASSESSOR,
};

const userinfo = {
  user_id: 1,
  username: 'discussion_believed_pleasant',
  role: [Role.ASSESSOR], //, {USER}, "ADMIN"
  created_at: myStartDate,
  updated_at: myEndDate,
  password: '044498e8-6478-4184-b26f-d7b9be6a00d1',
};

let userAuthenticationLog = new AuthResponse();
userAuthenticationLog = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV',
  user: userinfo,
};

const moduleMocker = new ModuleMocker(global);

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    process.env = {
      DATABASE_URL: 'postgres://localhost:5432/test',
      JWT_SECRET: "mycustomuselongsecret",
      EXPIRESIN: "1h"
    };
    //const mock_AuthGuard: CanActivate = {canActivate: jest.fn(() => true)};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return {
            register: jest.fn().mockResolvedValue(userAuthenticationLog),
            login: jest.fn().mockResolvedValue(userAuthenticationLog),
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
    it('Should return the created user', async () => {
      expect(authController.register(registerDto)).resolves.toBe(
        userAuthenticationLog
      );
    });
  });

  describe('login', () => {
    //it('should return not found exception', async () => {
    //  expect(authController.login(null))
    //  .rejects.toThrowError(NotFoundException);
    //})
    it('should return token and user information', async () => {
      expect(authController.login(mockUser)).resolves.toBe(
        userAuthenticationLog
      );
    });
  });

  //describe('profile', () => {
  //    it("Should return the user's profile", async () => {
  //        expect(
  //            await authController.getLoggedUser(userinfo)
  //
  //        )
  //    })
  //})
});
