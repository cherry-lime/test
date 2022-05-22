// import { Test, TestingModule } from '@nestjs/testing';
// import { PrismaService } from '../prisma/prisma.service';
// import { UserService } from './user.service';
// import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

// const moduleMocker = new ModuleMocker(global);

// // Mock users array
// const userArray = [
//   {
//     user_id: '7db7a72e-327e-488a-9a99-3b0e0dac2f26',
//     password_hash: 'fdsfdsfds',
//   },
//   {
//     user_id: '7db7a72e-327e-488a-9a99-3b0e0dac2f27',
//     password_hash: 'fdsfdsdfdfdsdsfss',
//   },
// ];
// // Mock single user
// const aUser = userArray[0];

// // Mock prisma service
// const mockPrisma = {
//   user: {
//     findMany: jest.fn().mockResolvedValue(userArray),
//     findUnique: jest.fn().mockResolvedValue(aUser),
//     findFirst: jest.fn().mockResolvedValue(aUser),
//     findOne: jest.fn().mockResolvedValue(aUser),
//     create: jest.fn().mockResolvedValue(aUser),
//     save: jest.fn(),
//     update: jest.fn().mockResolvedValue(aUser),
//     delete: jest.fn().mockResolvedValue(aUser),
//   },
// };

// describe('UserService', () => {
//   let userService: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService],
//     })
//       .useMocker((token) => {
//         if (token === PrismaService) {
//           return mockPrisma;
//         }
//         if (typeof token === 'function') {
//           const mockMetadata = moduleMocker.getMetadata(
//             token
//           ) as MockFunctionMetadata<any, any>;
//           const Mock = moduleMocker.generateFromMetadata(mockMetadata);
//           return new Mock();
//         }
//       })
//       .compile();

//     userService = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });

//   describe('getUsers', () => {
//     it('Should return the found users', async () => {
//       expect(
//         userService.getUser('7db7a72e-327e-488a-9a99-3b0e0dac2f26')
//       ).resolves.toBe(aUser);
//     });
//   });
// });
