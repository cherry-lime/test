import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty({ default: 'New Answer' })
  answer_text: string;

  @ApiProperty()
  answer_weight: number;

  @ApiProperty()
  template_id: number;
}
