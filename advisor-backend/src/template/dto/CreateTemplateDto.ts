import { ApiProperty } from '@nestjs/swagger';
import { AssessmentType } from '@prisma/client';
import { IsEnum, MinLength } from 'class-validator';

/**
 * DTO for creating a new template
 */
export class CreateTemplateDto {
  @ApiProperty()
  @MinLength(4)
  template_name: string;

  @ApiProperty()
  @IsEnum(AssessmentType)
  template_type: AssessmentType;
}
