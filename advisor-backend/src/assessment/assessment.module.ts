import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { FeedbackService } from 'src/feedback/feedback.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService, CheckpointService, FeedbackService],
})
export class AssessmentModule {}
