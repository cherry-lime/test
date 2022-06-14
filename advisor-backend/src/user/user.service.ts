import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

    delete user.password_hash;

    return user;
  }
}
