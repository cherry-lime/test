import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { TeamsModule } from './teams/teams.module';
import { AssessmentModule } from './assessment/assessment.module';
import { TemplateModule } from './template/template.module';
import { CategoryModule } from './category/category.module';
import { SubareaModule } from './subarea/subarea.module';
import { MaturityModule } from './maturity/maturity.module';
import { TopicModule } from './topic/topic.module';
import { AnswerModule } from './answer/answer.module';
import { SaveModule } from './save/save.module';
import { FeedbackModule } from './feedback/feedback.module';

// NestJS Module System helps structure application code into domain areas
//  leading to better design and improved maintainability.
// Controllers are responsible for handling incoming requests and returning responses to the client.
// Providers are responsible for executing business logic and returning data to the controller.
// Module for application routes
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
    CheckpointModule,
    TopicModule,
    AnswerModule,
    SaveModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
