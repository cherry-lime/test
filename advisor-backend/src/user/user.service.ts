import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get user object by uuid
   * @param uuid uuid of user
   * @returns user object corresponding to userid, null if not found
   */
  async getUser(uuid: string) {
    return;
  }
}
