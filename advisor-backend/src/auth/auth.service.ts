import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '../../node_modules/@nestjs/jwt';
import { AuthResponse } from './dto/auth-response.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UserService
  ) {}

  /**
   * Log in
   * @param loginDto username and password 
   * @returns generated token and user information
   * @throws user is not found
   * @throws password is invalid
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { username, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const new_hashed_password = await bcrypt.hash(user.password, 10);

    const validatePassword = await bcrypt.compare(
      password,
      new_hashed_password
    );

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    // if (password_hash != user.password_hash) {
    //   throw new UnauthorizedException('invalid password');
    // }

    // let token = await this.getJwtToken(user);

    return {
      // token,
      token: await this.jwtService.signAsync({
        username,
      }),
      user,
    };
  }
  
  // /**
  //  * Generate the jwt token with some user's data as payload to it.
  //  * @param createUserDto information for creating a user
  //  * @returns a generated token and user information 
  //  */
  // public async getJwtToken(user: User): Promise<AuthResponse>{
  //   const payload = {
  //    ...user
  //   }
  //   return {
  //     // token,
  //     token: this.jwtService.sign({
  //       username,
  //     }),
  //     user,
  //   };;
  // }


  /**
   * Create a user
   * @param createUserDto information for creating a user
   * @returns a generated token and user information 
   */
  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.createUser(createUserDto);
    return {
      token: this.jwtService.sign({ username: user.username }),
      user,
    };
  }
}
