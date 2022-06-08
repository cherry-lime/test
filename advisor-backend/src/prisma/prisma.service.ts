import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService is a wrapper around the PrismaClient.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
 * Shut down app on database disconnect.
 * @param app Nestjs application
 */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', this.beforeExit.bind(this, app));
  }

  /**
   * Close app on database disconnect.
   * @param app NestJS application
   */
  async beforeExit(app: INestApplication) {
    await app.close();
  }
}
