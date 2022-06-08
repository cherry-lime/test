import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  // @IsUUID()
  password_hash: string;
}
