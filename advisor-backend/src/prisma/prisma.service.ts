import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService is a wrapper around the PrismaClient.
 */

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Shut down app on database disconnect.
   * @param app Nestjs application
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
