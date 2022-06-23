import { PickType } from '@nestjs/swagger';
import { AssessmentDto } from './assessment.dto';

export class CreateAssessmentDto extends PickType(AssessmentDto, [
  'assessment_type',
  'team_id',
] as const) {}
