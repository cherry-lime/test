import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';
/**
 * Response with template information
 */
export class TemplateDto {
  @ApiProperty()
  template_id: number;

  @ApiProperty()
  template_name: string;

  @ApiProperty()
  template_description: string;

  @ApiProperty({ enum: AssessmentType })
  template_type: AssessmentType;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  weight_range_min: number;

  @ApiProperty()
  weight_range_max: number;

  @ApiProperty()
  score_formula: string;

  @ApiProperty()
  include_no_answer: boolean;
}
