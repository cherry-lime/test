import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateAssessmentDto {
  @ApiProperty()
  assessment_name: string;

  @ApiProperty({ enum: AssessmentType })
  @IsEnum(AssessmentType)
  assessment_type: AssessmentType;

  @ApiProperty()
  template_id: number;

  @ApiProperty()
  country_name: string;

  @ApiProperty()
  department_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  team_id?: number;
}
