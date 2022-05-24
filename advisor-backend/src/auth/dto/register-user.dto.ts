import { Role } from '@prisma/client';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  //@IsString()
  //@Length(1, 10)
  //username: string;

  @Length(1, 10)
  role: Role;
}
