import { PickType } from '@nestjs/swagger';
import { AssessmentDto } from './assessment.dto';

export class CreateAssessmentDto extends PickType(AssessmentDto, [
  'assessment_type',
  'template_id',
  'team_id',
] as const) {}
