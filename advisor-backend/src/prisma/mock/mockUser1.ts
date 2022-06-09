import { Role } from '@prisma/client';

// Mock users array
export const userArray1 = [
  {
    user_id: 1,
    username: 'test_username',
    password_hash: 'test_password_hash',
    role: Role.USER,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
// Mock single user
export const aUser1 = userArray1[0];

export const mockUser1 = {
  findMany: jest.fn().mockResolvedValue([aUser1]),
};
