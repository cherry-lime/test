import { User } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class AuthResponse {
  @ApiProperty()
  token: string;
  @ApiProperty()
  user: User;
}
