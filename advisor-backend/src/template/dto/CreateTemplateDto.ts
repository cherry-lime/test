import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';
import { IsEnum, MinLength } from 'class-validator';

/**
 * DTO for creating a new template
 */
export class CreateTemplateDto {
  @ApiProperty({ minLength: 4 })
  @MinLength(4)
  template_name: string;

  @ApiProperty({ enum: AssessmentType })
  @IsEnum(AssessmentType)
  template_type: AssessmentType;
}
