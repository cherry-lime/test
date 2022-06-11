import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  } 


  async validate(username: string, password: string){
    let login = new LoginDto();
    login = {
        username:username,
        password:password
    }
    const user = (await this.authService.login(login)).user
 
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}