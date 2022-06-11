import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './../auth/dto/register-user.dto';
import { User } from '../../node_modules/.prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(user_id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    // generate random usernames
    const randomWords = require('random-words');
    const new_username = randomWords({ min: 2, max: 3, join: '_' });

    const existing = await this.prismaService.user.findUnique({
      where: {
        username: new_username,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const myuuid = uuidv4();

    const hashedPassword = await bcrypt.hash(myuuid, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
        username: new_username,
      },
    });

    var userinfos : User = {...user}
    userinfos.password = myuuid;


    //delete user.password_hash;
    return userinfos;
  }
}
