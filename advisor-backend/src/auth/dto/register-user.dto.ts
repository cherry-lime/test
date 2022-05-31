import { Role } from '@prisma/client';
import { IsIn, IsString, Length } from 'class-validator';

export class CreateUserDto {

  @IsIn([Role.USER, Role.ASSESSOR])
  roles: Role;
}
