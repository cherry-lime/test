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

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { username, password_hash } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const new_hashed_password = await bcrypt.hash(user.password_hash, 10);

    const validatePassword = await bcrypt.compare(
      password_hash,
      new_hashed_password
    );

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    // if (password_hash != user.password_hash) {
    //   throw new UnauthorizedException('invalid password');
    // }

    return {
      token: this.jwtService.sign({
        username,
      }),
      user,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.createUser(createUserDto);
    return {
      token: this.jwtService.sign({ username: user.username }),
      user,
    };
  }
}
