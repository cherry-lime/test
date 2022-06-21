import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
<<<<<<< HEAD
import { CheckpointModule } from './checkpoint/checkpoint.module';
=======
import { TeamsModule } from './teams/teams.module';
>>>>>>> master
import { AssessmentModule } from './assessment/assessment.module';
import { TemplateModule } from './template/template.module';
import { CategoryModule } from './category/category.module';
import { SubareaModule } from './subarea/subarea.module';
import { MaturityModule } from './maturity/maturity.module';
import { TopicModule } from './topic/topic.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    TeamsModule,
    AuthModule,
    TemplateModule,
    AssessmentModule,
    CategoryModule,
    SubareaModule,
    MaturityModule,
    TopicModule,
    AnswerModule,
    CheckpointModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
