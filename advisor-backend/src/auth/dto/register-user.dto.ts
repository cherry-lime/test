import { Role } from '@prisma/client';
import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsIn([Role.USER, Role.ASSESSOR])
  @ApiProperty()
  role: Role;

}
