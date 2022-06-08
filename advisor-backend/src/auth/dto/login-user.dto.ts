import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsUUID()
  @ApiProperty()
  password_hash: string;
}
