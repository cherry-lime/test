import { ApiProperty } from '@nestjs/swagger';

export class RecommendationDto {
  @ApiProperty()
  feedback_number: number;

  @ApiProperty()
  feedback_text: string;

  @ApiProperty()
  feedback_additional_information: string;
}
