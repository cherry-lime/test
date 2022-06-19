import { Module } from '@nestjs/common';
import { AnswerService } from 'src/answer/answer.service';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { FeedbackService } from './feedback.service';

@Module({
  providers: [FeedbackService, CheckpointService, AnswerService],
})
export class FeedbackModule {}
