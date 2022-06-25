import { OmitType } from '@nestjs/swagger';
import { AuthenticationDto } from '../../auth/dto/authentication.dto';

export class ProfileDto extends OmitType(AuthenticationDto, [
  'password',
  'AssessmentParticipants',
  'UserInTeam',
] as const) {}
