import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { CheckpointService } from '../checkpoint/checkpoint.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService, CheckpointService],
})
export class AssessmentModule {}
