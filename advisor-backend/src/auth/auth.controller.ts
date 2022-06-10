import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import AuthUser from '../common/decorators/auth-user.decorator';
import { User } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/register-user.dto';
import {
  ApiBearerAuth,
  ApiProperty,
  //ApiConflictResponse,
  //ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express-respond';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * [POST] /login
   * @param loginDto login information
   * @returns authentication response
   */
  // @Post('/login')
  // @ApiResponse({
  //   description: 'Logged in',
  //   type: LoginDto,
  // })
  // login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
  //   return this.authService.login(loginDto);
  // }

  @Post('/login')
  // @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) : Promise<AuthResponse> {
    const token = (await this.authService.login(loginDto)).token; //getJwtToken(req.user as User);

    const secretData = {
      token,
      refreshToken: '',
    };
 
    res.cookie('auth-cookie', secretData,{httpOnly:true,});
    return this.authService.login(loginDto); //{"msg" : "well done"};
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
  @ApiResponse({
    description: 'Found user',
  })
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
