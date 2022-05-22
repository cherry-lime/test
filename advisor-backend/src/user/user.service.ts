import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './../auth/dto/register-user.dto';
import { User } from '.prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService:PrismaService) {}

    async getUser(user_id: number): Promise<User> {

        const user = await this.prismaService.user.findUnique({
            where: { user_id }
        });

        if(!user) {
            throw new NotFoundException();
        }

        delete user.password_hash;
        return user;

    }

    async createUser(data: CreateUserDto): Promise<User> {
      
        const existing_id = await this.prismaService.user.findUnique({
            where: {
                user_id: data.user_id
            }
        });

        if(existing_id) {
            throw new ConflictException('user_id already exists');
        }

        const existing_username = await this.prismaService.user.findUnique({
            where: {
                username: data.username
            }
        });

        if(existing_username) {
            throw new ConflictException('user_id already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password_hash, 10);

        const user = await this.prismaService.user.create({
            data: {
                ...data,
                password_hash: hashedPassword
            }
        });

        delete user.password_hash;
        return user;
    }

  /**
   * Get user object by uuid
   * @param uuid uuid of user
   * @returns user object corresponding to userid, null if not found
   */
  // async getUser(uuid: string): Promise<any> {
  //   return await this.prisma.user.findFirst({
  //     where: {
  //       user_id: uuid,
  //     },
  //   });
  // }
}
