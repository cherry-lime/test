import { PickType } from '@nestjs/swagger';
import { AuthenticationDto } from './authentication.dto';

export class LoginDto extends PickType(AuthenticationDto, [
  'username',
  'password',
] as const) {}
