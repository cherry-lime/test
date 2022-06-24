import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { TemplateService } from '../template/template.service';
import { FeedbackService } from '../feedback/feedback.service';
import { SaveService } from '../save/save.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService, FeedbackService, TemplateService, SaveService],
})
export class AssessmentModule {}
