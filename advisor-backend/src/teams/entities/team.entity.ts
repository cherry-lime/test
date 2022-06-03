import { ApiProperty } from '@nestjs/swagger';

export class Team {
  @ApiProperty()
  team_id: number;

  @ApiProperty()
  team_name: string;

  @ApiProperty()
  // UUID
  invite_token: string;
}
