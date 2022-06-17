import { PickType } from '@nestjs/swagger';
import { AssessmentDto } from './assessment.dto';

export class FeedbackDto extends PickType(AssessmentDto, ['feedback_text']) {}
