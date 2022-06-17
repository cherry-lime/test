import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

/**
 * Response with user information
 */
export class userResponse {
    @ApiProperty()
    user_id: number;
  
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    role: Role;
  
    @ApiProperty()
    created_at: Date;
  
    @ApiProperty()
    updated_at: Date;
  }
  