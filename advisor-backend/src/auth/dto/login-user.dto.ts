import { PickType } from '@nestjs/swagger';
import { AutheticationDto } from './authentication.dto';

export class LoginDto extends PickType(AutheticationDto, [
  'username',
  'password',
] as const) {}
