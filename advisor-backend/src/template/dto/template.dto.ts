import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';
import { IsBoolean, IsEnum, Min } from 'class-validator';
/**
 * Response with template information
 */
export class TemplateDto {
  @ApiProperty({ default: 1 })
  template_id: number;

  @ApiProperty({ default: 'New Template' })
  template_name: string;

  @ApiProperty({ default: '' })
  template_description: string;

  @ApiProperty({ enum: AssessmentType, default: AssessmentType.INDIVIDUAL })
  @IsEnum(AssessmentType)
  template_type: AssessmentType;

  @ApiProperty({ default: '' })
  template_feedback: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  enabled: boolean;

  @ApiProperty({ default: 1 })
  @Min(0)
  weight_range_min: number;

  @ApiProperty({ default: 3 })
  weight_range_max: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  include_no_answer: boolean;
}
