import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(1, 10)
  username: string;

  @IsString()
  @Length(6, 12)
  password_hash: string;
}
