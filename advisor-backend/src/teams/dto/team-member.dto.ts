import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { aTeamMembers } from '../../prisma/mock/mockTeamMembers';

export class TeamMembers {
  @ApiProperty({
    example: aTeamMembers.team_members,
  })
  team_members: {
    user_id: number;
    username: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
  }[];
}
