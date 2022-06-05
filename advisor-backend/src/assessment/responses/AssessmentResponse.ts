import { ApiProperty } from '@nestjs/swagger';
import { Assessment, AssessmentType } from '@prisma/client';

/**
 * Response with assessment information
 */
export class AssessmentResponse {
  from(params: Assessment) {
    this.assessment_id = params.assessment_id;
    this.assessment_name = params.assessment_name;
    this.assessment_type = params.assessment_type;
    this.country_name = params.country_name;
    this.department_name = params.department_name;
    this.template_id = params.template_id;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.completed_at = params.completed_at;
    return this;
  }

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
