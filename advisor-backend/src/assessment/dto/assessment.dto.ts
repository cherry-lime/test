import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';

/**
 * Response with assessment information
 */
export class AssessmentDto {
  @ApiProperty()
  assessment_id: number;

  @ApiProperty()
  assessment_name: string;

  @ApiProperty({ enum: AssessmentType })
  assessment_type: AssessmentType;

  @ApiProperty()
  country_name: string;

  @ApiProperty()
  department_name: string;

  @ApiProperty()
  template_id: number;

  @ApiProperty()
  feedback_text: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiPropertyOptional()
  completed_at?: Date;

  @ApiPropertyOptional()
  team_id?: number;
}
