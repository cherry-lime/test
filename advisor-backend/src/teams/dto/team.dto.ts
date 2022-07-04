import { ApiProperty } from '@nestjs/swagger';

// Data transfer object for a team
// Default values of a team member dto for the swagger documentation
export class Team {
  @ApiProperty({ default: 1 })
  team_id: number;

  @ApiProperty({ default: 'New Team' })
  team_name: string;

  @ApiProperty({ default: 'bf30b88f-a641-4194-9c5a-95b801884440' })
  // Invite tokens are used to invite new team members
  // Invite tokens are UUID strings
  // Invite tokens are autogenerated when a team is created
  invite_token: string;

  @ApiProperty({ default: 'Netherlands' })
  team_country: string;

  @ApiProperty({ default: 'IT' })
  team_department: string;
}
