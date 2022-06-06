import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAssessmentDto } from './create-assessment.dto';

export class UpdateAssessmentDto extends PartialType(
  OmitType(CreateAssessmentDto, ['team_id', 'assessment_type', 'template_id'])
) {}
