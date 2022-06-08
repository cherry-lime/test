// Mock users array
export const userArray = [
  {
    user_id: 1,
    user_name: 'test_user_name',
    password_hash: 'fdsfdsfds',
  },
  {
    user_id: 2,
    password_hash: 'fdsfdsdfdfdsdsfss',
  },
];
// Mock single user
export const aUser = userArray[0];

export const mockUser = {
  findMany: jest.fn().mockResolvedValue(userArray),
  findUnique: jest.fn().mockResolvedValue(aUser),
  findFirst: jest.fn().mockResolvedValue(aUser),
  findOne: jest.fn().mockResolvedValue(aUser),
  create: jest.fn().mockResolvedValue(aUser),
  save: jest.fn(),
  update: jest.fn().mockResolvedValue(aUser),
  delete: jest.fn().mockResolvedValue(aUser),
};
