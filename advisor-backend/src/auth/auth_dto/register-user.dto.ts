import { PickType } from '@nestjs/swagger';
import { AutheticationDto } from './authentication.dto';

export class CreateUserDto extends PickType(AutheticationDto, [
  'role',
] as const) {}
