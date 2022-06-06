import { PickType } from '@nestjs/swagger';
import { AssessmentDto } from './assessment.dto';

export class CreateAssessmentDto extends PickType(AssessmentDto, [
  'assessment_name',
  'assessment_type',
  'template_id',
  'country_name',
  'department_name',
  'team_id',
] as const) {}
