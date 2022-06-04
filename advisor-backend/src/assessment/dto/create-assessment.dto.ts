import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';

export class CreateAssessmentDto {
  @ApiProperty()
  assessment_name: string;

  @ApiProperty({ enum: AssessmentType })
  template_type: AssessmentType;
}
