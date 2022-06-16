import { OmitType } from '@nestjs/swagger';
import { AuthenticationDto } from '../../auth/auth_dto/authentication.dto';

export class ProfileDto extends OmitType(AuthenticationDto, [
  'password',
  'AssessmentParticipants',
  'UserInTeam',
] as const) {}
