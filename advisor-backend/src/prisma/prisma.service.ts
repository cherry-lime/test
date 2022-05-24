import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService is a wrapper around the PrismaClient.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Set datasource of PrismaClient
   * @param config
   */
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
