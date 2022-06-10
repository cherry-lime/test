import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @IsString()
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
