import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
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

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * [GET] /user - Get all users
   * @returns userResponse[] List of all users
   */
  @ApiResponse({
    description: 'Found users',
    type: userResponse,
    isArray: true,
  })
  @Get('')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.ASSESSOR)
  async findAll(): Promise<any> {
    return this.userService.findAll();
  }

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

  /**
   * [DELETE] /user/:id - Delete user by id
   * @param id user_id
   * @returns Deleted user
   */
  @Delete(':user_id')
  @ApiResponse({ description: 'Deleted user', type: userResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async delete(
  @Param('user_id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.userService.delete(id);
  }
}
