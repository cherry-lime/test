import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './../auth/dto/register-user.dto';
import { User } from '.prisma/client';
// import { PrismaClient } from '@prisma/client';

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
      
        const existing = await this.prismaService.user.findUnique({
            where: {
                username: data.username
            }
        });

        if(existing) {
            throw new ConflictException('username already exists');
        }

        // const hashedPassword = await bcrypt.hash(data.password_hash, 10);
        // const uuid_pass = prismaService.user.
        // const uuid_pass: User = await prismaService.user({ email: 'ada@prisma.io' })

        const user = await this.prismaService.user.create({
            data: {
                ...data
                // username: data.username
                // password_hash: hashedPassword
            }
        });

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
