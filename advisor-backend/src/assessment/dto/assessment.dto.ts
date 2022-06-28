import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';

/**
 * Response with assessment information
 */
export class AssessmentDto {
  @ApiProperty({ default: 1 })
  assessment_id: number;

  @ApiProperty({ default: 'New Assessment' })
  assessment_name: string;

  @ApiProperty({ enum: AssessmentType, default: AssessmentType.INDIVIDUAL })
  assessment_type: AssessmentType;

  @ApiProperty({ default: 'Netherlands' })
  country_name: string;

  @ApiProperty({ default: 'IT' })
  department_name: string;

  @ApiProperty({ default: 1 })
  template_id: number;

  @ApiProperty({ default: '' })
  feedback_text: string;

  @ApiProperty({ default: '' })
  information: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiPropertyOptional()
  completed_at?: Date;

  @ApiPropertyOptional({ default: 1 })
  team_id?: number;
}
