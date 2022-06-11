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
  async login({username, password}: LoginDto): Promise<AuthResponse> {

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(
      password,
      user.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    return {
      token: this.jwtService.sign({
        username,
      }),
      user,
    };
  }
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
