import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../auth/auth_dto/register-user.dto';
import { User } from '../../node_modules/.prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Get user object by id
   * @param id id of user
   * @returns user object corresponding to user_id, null if not found
   * @throws NotFoundException if user not found
   */
  async getUser(id: number): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    // generate random usernames
    const randomWords = require('random-words');
    const new_username = randomWords({
      min: 2,
      max: 3,
      join: '_'
    });

    const username = await this.prisma.user
      .findUnique({
        where: {
          username: new_username
        },
      }).catch(() => {
        throw new InternalServerErrorException();
      });

    if (!username) {
      throw new NotFoundException('user not found');
    }

    // generate a uuidv4
    const myuuid = uuidv4();

    // hash a password with a salt
    const salt = 10;
    const hashedPassword = await bcrypt
      .hash(
        myuuid,
        salt
      );

    const user = await this.prisma.user
      .create({
        data: {
          ...data,
          password: hashedPassword,
          username: new_username,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error if username already exists
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }
      });

    // clone the created user
    const userinfos: User = { ...user };

    // modify the password variable to the uuidv4
    userinfos.password = myuuid;

    // return the modified user
    return userinfos;
  }
}
