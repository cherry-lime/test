import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './../auth/dto/register-user.dto';
import { User } from '.prisma/client';
// import { PrismaClient } from '@prisma/client';

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

    delete user.password_hash;
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

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        username: new_username,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    delete user.password_hash;
    return user;
  }

  /**
   * Get user object by id
   * @param id id of user
   * @returns user object corresponding to user_id, null if not found
   */
  //   async getUser(id: number): Promise<any> {
  //     return await this.prisma.user.findFirst({
  //       where: {
  //         user_id: id,
  //       },
  //     });
  //   }
}
