import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { TemplateService } from '../template/template.service';
import { SaveService } from '../save/save.service';
import { FeedbackService } from '../feedback/feedback.service';

@Module({
  controllers: [AssessmentController],
  providers: [
    AssessmentService,
    SaveService,
    FeedbackService,
    TemplateService,
  ],
})
export class AssessmentModule { }
