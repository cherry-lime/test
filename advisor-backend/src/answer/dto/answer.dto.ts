import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class AnswerDto {
  @ApiProperty({ default: 'New Answer' })
  answer_text: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  answer_weight: number;

  @ApiProperty()
  template_id: number;

  @ApiProperty({ default: false })
  disabled: boolean;
}
