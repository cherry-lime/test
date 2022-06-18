import { Module } from '@nestjs/common';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { FeedbackService } from './feedback.service';

@Module({
  providers: [FeedbackService, CheckpointService],
})
export class FeedbackModule {}
