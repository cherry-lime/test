import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
import { registerDto, userDto, UserWithoutPassword, userAuthenticationLog, userAuthenticationReg, mockPrisma} from '../prisma/mock/mockAuthService'
// import { JwtStrategy } from './jwt.strategy';
import { CreateUserDto } from './dto/register-user.dto';
import { LocalStrategy } from './local_strategy';

const moduleMocker = new ModuleMocker(global);

describe('AuthService', () => {
  let authService: AuthService;

  // ---------------- Working when using the local database (or azure) ----------------
  // beforeEach(async () => {
  //   authService = new AuthService(
  //     new PrismaService(),
  //     new JwtService({
  //       secretOrPrivateKey: 'mycustomuselongsecret'
  //     }),
  //     new UserService(
  //       new PrismaService()
  //     )
  //   );
  // });

  // describe('Login', () => {
  //   // it('should return an object', () => {
  //   //   // const loginDto = new LoginDto()
  //   //   expect(
  //   //     typeof authService.login(userDto)
  //   //   ).toEqual('object')
  //   // });
  //   it('should return a function', () => {
  //     // const loginDto = new LoginDto()
  //     expect(
  //       typeof authService.login(userDto)
  //     ).toEqual(typeof userAuthentication)
  //   });
  // });
  // ---------------- Working ----------------

  beforeEach(async () => {
    process.env = {
      DATABASE_URL: 'postgres://localhost:5432/test',
      JWT_SECRET: "mycustomuselongsecret",
      EXPIRESIN: "1h"
    };
    const module = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.EXPIRESIN,
          },
        })
      ],
      providers: [
        // UserService,
        // JwtStrategy,
        LocalStrategy,
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrisma
        }
      ],
    })
    .useMocker((token) => {
      if (token === UserService) {
        return {
          createUser: jest.fn().mockResolvedValue(UserWithoutPassword)
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
    authService = module.get<AuthService>(AuthService);
  });

  it('Authentication should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('Authentication login should be defined', () => {
    expect(authService.login(userDto)).toBeDefined();
  });

  it('Authentication registration should be defined', () => {
    expect(authService.register(registerDto)).toBeDefined();
  });

  describe('When registering', () => {
    it('should return the correct AuthResponse type', async () => {
      expect(
        typeof authService.register(registerDto)
      )
      .toEqual(typeof userAuthenticationReg);
    })
  })

  
  describe('When logging in', () => {
    it('should return an AuthResponse type', () => {
      // const userId = 1;
      expect(
        typeof authService.login(userDto)
      ).toEqual(typeof userAuthenticationLog)
    })
    // it('should return an AuthResponse type', () => {
    //   // const userId = 1;
    //   expect(
    //    authService.login(userDto)
    //   ).resolves.toBe(userAuthenticationLog)
    // })

    // it("should", async () => {
      // expect.assertions(1);
      // try {
      //   expect(authService.login(userDtoNotFound))
      // } catch(error) {
      //   expect(error.message).toBe("user not found")
      // }
      // expect(() => {
      //   authService.login(userDtoNotFound);
      // }).toThrowError("user not found");
    // }) 

    // it('should return a NotFoundException on the user', () => {
    //   // const userId = 1;
    //   expect( () =>{
    //     authService.login(userDtoNotFound);}
    //   ).toThrow(new NotFoundException('user not found')) //.toEqual(userAuthenticationLog)
    // })
  })
});