import { OmitType, PartialType } from '@nestjs/swagger';
import { Team } from './team.dto';

export class UpdateTeamDto extends PartialType(
  OmitType(Team, ['team_id', 'invite_token'] as const)
) {}
