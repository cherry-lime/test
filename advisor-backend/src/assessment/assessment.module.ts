import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { TemplateService } from '../template/template.service';
import { FeedbackService } from '../feedback/feedback.service';
import { AssessmentScoreService } from './assessment-score.service';

@Module({
  controllers: [AssessmentController],
  providers: [
    AssessmentService,
    AssessmentScoreService,
    CheckpointService,
    FeedbackService,
    TemplateService,
  ],
})
export class AssessmentModule {}
