import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AssessmentModule } from './assessment/assessment.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, UserModule, AssessmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
