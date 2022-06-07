import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import AuthUser from '../common/decorators/auth-user.decorator';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * [POST] /login
   * @param loginDto login information
   * @returns authentication response
   */
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  /**
   * [POST] /register
   * @param createUserDto information for creating a user
   * @returns registration response
   */
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(createUserDto);
  }

  /**
   * [GET] /profile
   * @param user 
   * @returns user 
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
