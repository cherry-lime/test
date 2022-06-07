import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService(
      new PrismaService(),
      new JwtService(),
      new UserService(new PrismaService())
    );
  });
  describe('when creating a user', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
    // it('should return a string', () => {
    //   const loginDto = new LoginDto()
    //   expect(
    //     typeof authService.login(loginDto)
    //   ).toEqual('string')
    // })
  });

  // const module: TestingModule = await Test.createTestingModule({
  //     providers: [UserService, AuthService],
  // }).compile()
});
