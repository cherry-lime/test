import { Role } from '@prisma/client';
import { IsIn } from 'class-validator';

export class CreateUserDto {

  @IsIn([Role.ASSESSOR, Role.USER])
  roles: Role;
}
