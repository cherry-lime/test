import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class AnswerDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  answer_id?: number;

  @ApiProperty({ default: 'New Answer' })
  answer_text: string;

  @ApiProperty({ default: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  answer_weight?: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  template_id: number;

  @ApiProperty({ default: false })
  disabled: boolean;
}
