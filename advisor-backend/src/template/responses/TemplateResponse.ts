import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';

/**
 * Response with template information
 */
export class TemplateResponse {
  @ApiProperty()
  template_id: number;

  @ApiProperty()
  template_name: string;

  @ApiProperty({ enum: AssessmentType })
  template_type: AssessmentType;

  @ApiProperty()
  disabled: boolean;

  @ApiProperty()
  weight_range_min: number;

  @ApiProperty()
  weight_range_max: number;

  @ApiProperty()
  score_formula: string;

  @ApiProperty()
  include_no_answer: boolean;
}
