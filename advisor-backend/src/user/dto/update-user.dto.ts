import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
