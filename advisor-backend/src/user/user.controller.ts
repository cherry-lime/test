import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { UserService } from './user.service';

class userResponse {
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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * [GET] /user/:id
   * @param id user_id
   * @returns user object
   */
  @ApiResponse({ description: 'Found user', type: userResponse })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }
}
