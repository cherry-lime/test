import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class RecommendationDto {
  @ApiProperty({ default: 1 })
  @Min(1)
  order: number;

  @ApiProperty({ default: 'Feedback example' })
  feedback_text: string;

  @ApiProperty({ default: '' })
  feedback_additional_information: string;
}
