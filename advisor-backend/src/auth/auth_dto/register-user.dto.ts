import { PickType } from '@nestjs/swagger';
import { AuthenticationDto } from './authentication.dto';

export class CreateUserDto extends PickType(AuthenticationDto, [
  'role',
] as const) {}
