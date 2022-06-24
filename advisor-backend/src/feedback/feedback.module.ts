import { Module } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import { AnswerService } from '../answer/answer.service';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { FeedbackService } from './feedback.service';

@Module({
  providers: [
    FeedbackService,
    CheckpointService,
    AnswerService,
    TemplateService,
  ],
})
export class FeedbackModule {}
