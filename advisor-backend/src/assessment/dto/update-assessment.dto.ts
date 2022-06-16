import { PartialType, PickType } from '@nestjs/swagger';
import { AssessmentDto } from './assessment.dto';

export class UpdateAssessmentDto extends PartialType(
  PickType(AssessmentDto, [
    'country_name',
    'assessment_name',
    'department_name',
  ])
) {}
