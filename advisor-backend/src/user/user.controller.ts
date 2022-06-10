import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';

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
  constructor(private readonly userService: UserService) {}
  /**
   * [GET] /user/:id
   * @param id user_id
   * @returns user object
   */
  @ApiResponse({ description: 'Found user', type: userResponse })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.ASSESSOR)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }
}
