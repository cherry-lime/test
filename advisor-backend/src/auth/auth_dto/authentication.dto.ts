import { ApiProperty } from '@nestjs/swagger';
import { AssessmentParticipants, Role, UserInTeam } from '@prisma/client';
import { IsIn, IsString, IsUUID } from 'class-validator';

/**
 * Response with authentication information
 */
export class AuthenticationDto {
  @IsUUID()
  @ApiProperty()
  password: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @IsString()
  @ApiProperty()
  username: string;

  @ApiProperty()
  user_id: number;

  @IsIn([Role.USER, Role.ASSESSOR])
  @ApiProperty()
  role: Role;

  @ApiProperty()
  AssessmentParticipants: AssessmentParticipants[];

  @ApiProperty()
  UserInTeam: UserInTeam[];
}
