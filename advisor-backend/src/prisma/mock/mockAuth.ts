import { Role } from '@prisma/client';

// Random start and update date
const myStartDate: any = new Date();
const myEndDate: any = new Date();

export const mockUser = {
  username: 'hearing_refused_musical',
  password: 'f894a202-2f5b-4a69-89f7-f7f8f28a9368',
};

export const registerDto = {
    role: Role.ASSESSOR,
  };
  
export const userinfo = {
  user_id: 1,
  username: 'discussion_believed_pleasant',
  role: [Role.ASSESSOR], //, {USER}, "ADMIN"
  created_at: myStartDate,
  updated_at: myEndDate,
  password: '044498e8-6478-4184-b26f-d7b9be6a00d1',
};

export const userAuthenticationLog = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV',
  user: userinfo,
};
