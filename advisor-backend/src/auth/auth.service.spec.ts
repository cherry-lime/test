import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { JwtModule } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto'
import { AuthResponse } from './dto/auth-response.dto';
import { Role } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CreateUserDto } from './dto/register-user.dto';

const moduleMocker = new ModuleMocker(global);

// Random start and update date
let myStartDate: any = new Date();
let myEndDate: any = new Date();

// Mock users array
const userArray = [
  {
    username: "zipper_parent_instea",
    password_hash: "$2b$10$W0IgZUpL5y/Bomuw35U/8.YSkeduG1OCXG5xSYZQ6x8qNwoYYwxxG",
    user_id: 1,
    role: [Role.USER],
    created_at: myStartDate,
    updated_at: myEndDate
  },
  {
    username: "Jeremy",
    password_hash: "hashbrown",
    user_id: 2,
    role: [Role.USER],
    created_at: myStartDate,
    updated_at: myEndDate
  }
];

// Mock single user
const aUser = userArray[0];

// Mock a User dto when logging in
let userDto = new LoginDto();
userDto = {
  username: "zipper_parent_instea",
  password_hash: "$2b$10$W0IgZUpL5y/Bomuw35U/8.YSkeduG1OCXG5xSYZQ6x8qNwoYYwxxG"
};

// Mock a User registration dto
let registerDto = new CreateUserDto();
registerDto = {
  role: Role.USER
};

// Mock individual user 1
const aFullUser1 = {
  username: "zipper_parent_instea",
  password_hash: "$2b$10$W0IgZUpL5y/Bomuw35U/8.YSkeduG1OCXG5xSYZQ6x8qNwoYYwxxG",
  user_id: 1,
  role: [Role.USER],
  created_at: myStartDate,
  updated_at: myEndDate
};

// Mock individual user 2
const aFullUser2 = {
  username: "Foofi",
  password_hash: "examplehashedpassword",
  user_id: 2,
  role: [Role.USER],
  created_at: myStartDate,
  updated_at: myEndDate
};

// Mock user without a password
const UserWithoutPassword = {
  username: "Foofi",
  user_id: 2,
  role: [Role.USER],
  created_at: myStartDate,
  updated_at: myEndDate
};

// Mock authentication token dto for login
let userAuthenticationLog = new AuthResponse();
userAuthenticationLog = {
  token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InppcHBlcl9wYXJlbnRfaW5zdGVhZCIsImlhdCI6MTY1NDI0ODg5OSwiZXhwIjoxNjU0MjUyNDk5fQ.zYng49r6BXoY0m27RYkAeQZUfbG7Su9iBRqliEylOpU",
  user : aFullUser1
};

// Mock authentication token dto for registration
let userAuthenticationReg = new AuthResponse();
userAuthenticationReg = {
  token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InppcHBlcl9wYXJlbnRfaW5zdGVhZCIsImlhdCI6MTY1NDI0ODg5OSwiZXhwIjoxNjU0MjUyNDk5fQ.zYng49r6BXoY0m27RYkAeQZUfbG7Su9iBRqliEylOpU",
  user : aFullUser2
};

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
        JwtStrategy,
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