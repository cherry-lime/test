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
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all users
   * @returns All users
   */
  async findAll(): Promise<any> {
    // Return all templates from prisma
    const users =  await this.prisma.user.findMany();
    users.forEach((user) => delete user.password);
    return users;
  }

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

  /**
   * Create user
   * @param data CreateUserDto
   * @returns Created user
   * @throws Username already exists
   */
  async createUser(data: CreateUserDto): Promise<User> {
    // generate random usernames
    const randomWords = require('random-words');
    const new_username = randomWords({ min: 2, max: 3, join: '_' });

    const myuuid = uuidv4();
    const hashedPassword = await bcrypt.hash(myuuid, 10);

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
          // Throw error if username already exsits
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }
      });

    const userinfos: User = { ...user };
    userinfos.password = myuuid;

    //delete user.password_hash;
    return userinfos;
  }

    /**
   * Delete user from user_id
   * @param id user_id
   * @returns Deleted user
   * @throws User not found
   */
     async delete(id: number): Promise<any> {
      // Delete template by id from prisma
      return await this.prisma.user
        .delete({
          where: {
            user_id: id,
          },
        })
        .catch((error) => {
          if (error.code === 'P2025') {
            // Throw error if user not found
            throw new NotFoundException('User not found');
          }
          throw new InternalServerErrorException();
        });
    }
}
