import { Controller, Post, Body, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import AuthUser from '../common/decorators/auth-user.decorator';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/register-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * [POST] /login
   * @param loginDto login information
   * @returns string message
   */
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // : Promise<AuthResponse>
    const token = (await this.authService.login(loginDto)).token; //getJwtToken(req.user as User);

    const secretData = {
      token,
      refreshToken: '',
    };

    res.cookie('token', secretData, { httpOnly: true });
    return { msg: 'login successful' }; // this.authService.login(loginDto);
  }

  /**
   * [POST] /register
   * @param createUserDto information for creating a user
   * @returns registration response
   */
  @Post('/register')
  @ApiResponse({
    description: 'Registered',
    type: CreateUserDto,
  })
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    let register = await this.authService.register(createUserDto); //getJwtToken(req.user as User);

    const token = register.token;
    const user = register.user;

    const secretData = {
      token,
      refreshToken: '',
    };

    res.cookie('token', secretData, { httpOnly: true });
    return { username: user.username, password: user.password };
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token').send({ msg: 'logout successful' });
  }

  /**
   * [GET] /profile
   * @param user
   * @returns user
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  @ApiResponse({
    description: 'Found user',
  })
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
