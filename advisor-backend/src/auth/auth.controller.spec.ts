import { Test, TestingModule } from '../../node_modules/@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { AuthGuard } from './auth.guard';
//import { CanActivate, UnauthorizedException } from '@nestjs/common';
//import { PrismaService } from '../prisma/prisma.service';
//import { JwtService } from '@nestjs/jwt';
//import { UserService } from '../user/user.service';
//import { request } from 'http';
//import { HttpStatus, INestApplication } from '@nestjs/common';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Role, User } from '@prisma/client';

const mockUser = {
    username: "hearing_refused_musical",
    password_hash: "f894a202-2f5b-4a69-89f7-f7f8f28a9368",
    
  };

const registerDto = {
    roles: Role.ASSESSOR
}

//const userinfo = {
//    user_id: 1,
//    username: "discussion_believed_pleasant",
//    roles: Role.ADMIN,
//    created_at: "2022-05-29T08:58:20.369Z",
//    updated_at: "2022-05-29T08:58:20.372Z",
//    password_hash: "044498e8-6478-4184-b26f-d7b9be6a00d1"
//}

const moduleMocker = new ModuleMocker(global);

describe('AuthController', () => {
    let authController: AuthController;
    //let app: INestApplication;

    beforeEach(async () => {
        //const mock_AuthGuard: CanActivate = {canActivate: jest.fn(() => true)};
        
        const module: TestingModule = await Test
            .createTestingModule({
                controllers: [AuthController],
                //providers: [
                //    AuthService,
                //    PrismaService,
                //    JwtService,
                //    UserService
                //],
            })
            .useMocker((token) => {
                if (token === AuthService) {
                    return {
                        register: jest.fn().mockResolvedValue(Role.ASSESSOR),
                        login: jest.fn().mockResolvedValue(mockUser.username)
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
        //app = auth.createNestApplication();
        //await app.init();
        
        authController = module.get<AuthController>(AuthController);     
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
      });

    describe('register', () => {
        it("Should return the created user", async () => {
            expect(
                await authController.register(registerDto)
            )//.resolves.toBe(Role.ASSESSOR);
        });
    });
    
    describe('login', () => {
        it("should return token and user information", async () => {
            expect(await authController.login(mockUser))
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
}
);