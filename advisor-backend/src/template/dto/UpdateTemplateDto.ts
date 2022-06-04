import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';
import { IsEnum, MinLength } from 'class-validator';

/**
 * DTO for creating a new template
 */
export class UpdateTemplateDto {
  @ApiProperty({ minLength: 4 })
  @MinLength(4)
  template_name: string;

  @ApiProperty({ enum: AssessmentType })
  @IsEnum(AssessmentType)
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
