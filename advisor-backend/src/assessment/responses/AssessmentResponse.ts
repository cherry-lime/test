import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';

/**
 * Response with assessment information
 */
export class AssessmentResponse {
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
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  completed_at?: Date;
}
