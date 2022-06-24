import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { TemplateService } from '../template/template.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService, CheckpointService, TemplateService],
})
export class AssessmentModule {}
