import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * [GET] /user/:id
   * @param id user_id
   * @returns user object
   */
  // @Get(':id')
  // getUser(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.userService.getUser(id);
  // }
}
