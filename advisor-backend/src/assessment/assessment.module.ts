import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { AssessmentScoreService } from './assessment-score.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService, AssessmentScoreService],
})
export class AssessmentModule {}
