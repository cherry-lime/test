import { User } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

// used to construct the response during registration and login
export class AuthResponse {
  @ApiProperty()
  token: string;
  @ApiProperty()
  user: User;
}
