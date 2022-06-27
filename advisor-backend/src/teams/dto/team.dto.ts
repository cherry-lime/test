import { ApiProperty } from '@nestjs/swagger';

export class Team {
  @ApiProperty({ default: 1 })
  team_id: number;

  @ApiProperty({ default: 'New Team' })
  team_name: string;

  @ApiProperty({ default: 'bf30b88f-a641-4194-9c5a-95b801884440' })
  invite_token: string;

  @ApiProperty({ default: 'Netherlands' })
  team_country: string;

  @ApiProperty({ default: 'IT' })
  team_department: string;
}
