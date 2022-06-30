import { Test, TestingModule } from '../../node_modules/@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { AdminUser, AssessorUser, aUser, updateUserDto, updateUserDtoAdmin, updateUserDtoAssessor, userArray } from '../prisma/mock/mockUser';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from '../auth/dto/register-user.dto';
import { registerDto } from '../prisma/mock/mockAuthService';

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

  describe('should be defined:', () => {
    it('userService', () => {
      expect(userService).toBeDefined();
    });

    it('createUser function', () => {
      expect(userService.createUser).toBeDefined();
    });

    it('delete function', () => {
      expect(userService.delete).toBeDefined();
    });

    it('findAll function', () => {
      expect(userService.findAll).toBeDefined();
    });

    it('getUser function', () => {
      expect(userService.getUser).toBeDefined();
    });

    it('updateUser function', () => {
      expect(userService.updateUser).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('Should return all the found users', async () => {
      expect(userService.findAll()).resolves.toBe(userArray);
    });
  });

  describe('getUser', () => {
    it('Should return the found users', async () => {
      expect(userService.getUser(1)).resolves.toBe(aUser);
    });

    it('Should reject if user with given user_id is not found', async () => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);
      expect(userService.getUser(1))
        .rejects
        .toThrowError(
          NotFoundException
        );
    });
  });

  describe('updateUser', () => {
    it('Should throw NotFoundException if not found', async () => {
      jest
        .spyOn(prisma.user, 'update')
        .mockRejectedValue({ code: 'P2025' });
      expect(
        userService.updateUser(aUser.user_id, updateUserDto)
      ).rejects.toThrowError(NotFoundException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.user, 'update')
        .mockRejectedValue({ code: 'TEST' });
      expect(
        userService.updateUser(aUser.user_id, updateUserDto)
      ).rejects.toThrowError(InternalServerErrorException);
    });

    it('should return user with role modified to assessor', async () => {
      jest
        .spyOn(prisma.user, 'update').mockResolvedValue(AssessorUser)
      expect(((await userService.updateUser(aUser.user_id, updateUserDtoAssessor)).role))
        .toEqual(
          AssessorUser.role
        );
    });

    it('should return user with role modified to admin', async () => {
      jest
        .spyOn(prisma.user, 'update').mockResolvedValue(AdminUser)
      expect(((await userService.updateUser(aUser.user_id, updateUserDtoAdmin)).role))
        .toEqual(
          AdminUser.role
        );
    });
  });

  // describe('CreateUsers', () => {
  //   it('Should throw NotFoundException if not found', async () => {
  //     jest
  //       .spyOn(prisma.user, 'findUnique')
  //     expect(
  //       userService.createUser(registerDto)
  //     ).rejects.toThrowError(NotFoundException);
  //   });

  //   it('Should reject with unknown error', async () => {
  //     jest
  //       .spyOn(prisma.user, 'findUnique')
  //     expect(
  //       userService.createUser(registerDto)
  //     ).rejects.toThrowError(InternalServerErrorException);
  //   });

  //   it('Should throw NotFoundException if not found', async () => {
  //     jest
  //       .spyOn(prisma.user, 'create')
  //       .mockRejectedValue({ code: 'P2002' });
  //     expect(
  //       userService.createUser(registerDto)
  //     ).rejects.toThrowError(ConflictException);
  //   });

  //   it('Should reject with unknown error', async () => {
  //     jest
  //       .spyOn(prisma.user, 'create')
  //       .mockRejectedValue({ code: 'TEST' });
  //     expect(
  //       userService.createUser(registerDto)
  //     ).rejects.toThrowError(InternalServerErrorException);
  //   });
  //   //it('Should return the found users', async () => {
  //   //  expect(userService.getUser(1)).resolves.toBe(aUser);

  //   // it('Should throw NotFoundException if no user is found', async () => {
  //   //   jest.spyOn(prisma.user, 'findFirst').mockReturnValueOnce(null);
  //   //   expect(userService.getUser(2)).rejects.toThrow(NotFoundException);
  //   // });
  // });
});
