import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './../auth/dto/register-user.dto';
import { User } from '../../node_modules/.prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
    const new_username = randomWords({ min: 2, max: 3, join: '_' });

    const myuuid = uuidv4();
    const hashedPassword = await bcrypt.hash(myuuid,10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        username: new_username,
      },
    }).catch((error) => {
      if (error.code === 'P2002') {
        // Throw error if username already exsits
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    });;

    var userinfos : User = {...user}
    userinfos.password = myuuid;


    //delete user.password_hash;
    return userinfos;
  }
}
