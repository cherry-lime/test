import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthResponse } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  // prismaService: any;
  constructor(private prismaService: PrismaService) {
    super({ usernameField: 'usernames', passwordField: 'passwords'});
  } 
  //,
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // ignoreExpiration: false,
  // secretOrKey: process.env.JWT_SECRET,
 
  async validate(usernames: string, passwords: string, payload: { username: string }){
    // let login = new LoginDto();
    // login = {
    //     username:usernames,
    //     password:passwords
    // }
    const user = await this.prismaService.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    // let users = await this.prismaService.login(login);
    // console.log(user);
 
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}