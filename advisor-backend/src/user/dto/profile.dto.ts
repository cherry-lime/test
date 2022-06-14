import { OmitType } from '@nestjs/swagger';
import { AutheticationDto } from '../../auth/auth_dto/authentication.dto';

export class ProfileDto extends OmitType(AutheticationDto, [
  'password',
  'AssessmentParticipants',
  'UserInTeam',
] as const) {}
