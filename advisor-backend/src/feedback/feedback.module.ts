import { Module } from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import { AnswerService } from '../answer/answer.service';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { FeedbackService } from './feedback.service';
import { SaveService } from '../save/save.service';
import { TopicService } from '../topic/topic.service';

@Module({
  providers: [
    FeedbackService,
    CheckpointService,
    AnswerService,
    TemplateService,
    SaveService,
    TopicService,
  ],
})
export class FeedbackModule {}
