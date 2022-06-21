import { ApiProperty } from '@nestjs/swagger';

export class TeamMembers {
  @ApiProperty()
  team_name: string;

  @ApiProperty()
  team_members: { username: string; role: string }[];
}
