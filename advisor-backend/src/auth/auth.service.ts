import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './auth_dto/login-user.dto';
import { JwtService } from '../../node_modules/@nestjs/jwt';
import { AuthResponse } from './auth_dto/auth-response.dto';
import { CreateUserDto } from './auth_dto/register-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UserService
  ) { }

  /**
   * Log in
   * @param loginDto username and password
   * @returns generated token and user information
   * @throws user is not found
   * @throws password is invalid
   */
  async login({ username, password }: LoginDto): Promise<AuthResponse> {
    const user = await this.prismaService.user
      .findUnique({
        where: {
          username
        },
      }).catch(() => {
        throw new InternalServerErrorException();
      });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    // compare the hashes of the given password 
    const validatePassword = await bcrypt
      .compare(
        password,
        user.password
      );

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    return {
      token: await this.jwtService
        .signAsync({
          user_id: user.user_id,
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
    const user = await this.usersService
      .createUser(
        createUserDto
      )
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return {
      token: this.jwtService
        .sign({
          user_id: user.user_id
        }),
      user,
    };
  }
}