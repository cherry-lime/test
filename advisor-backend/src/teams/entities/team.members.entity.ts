import { ApiProperty } from '@nestjs/swagger';

export class TeamMembers {
  @ApiProperty()
  team_id: number;

  @ApiProperty()
  team_name: string;

  @ApiProperty()
  team_member_ids: number[];

  @ApiProperty()
  team_members: string[];
}
