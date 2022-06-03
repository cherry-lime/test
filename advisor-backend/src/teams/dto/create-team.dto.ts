import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new team
 */
export class CreateTeamDto {
  @ApiProperty()
  team_name: string;
}
