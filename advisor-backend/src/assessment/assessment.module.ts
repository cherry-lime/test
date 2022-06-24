import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { TemplateService } from '../template/template.service';
import { FeedbackService } from '../feedback/feedback.service';
import { AssessmentScoreService } from './assessment-score.service';
import { SaveService } from '../save/save.service';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { TopicService } from '../topic/topic.service';

@Module({
  controllers: [AssessmentController],
  providers: [
    AssessmentService,
    AssessmentScoreService,
    CheckpointService,
    FeedbackService,
    TemplateService,
    SaveService,
    CheckpointService,
    TopicService,
  ],
})
export class AssessmentModule {}
