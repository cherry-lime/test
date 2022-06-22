import { PickType } from '@nestjs/swagger';
import { Team } from './team.dto';

/**
 * DTO for creating a new team
 */
export class CreateTeamDto extends PickType(Team, [
  'team_name',
  'team_country',
  'team_department',
] as const) {}
