import { Role } from '@prisma/client';
import { IsIn } from 'class-validator';

export class CreateUserDto {
  @IsIn([Role.USER, Role.ASSESSOR])
  role: Role;
}
