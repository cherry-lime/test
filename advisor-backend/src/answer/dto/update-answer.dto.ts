import { PartialType, PickType } from '@nestjs/swagger';
import { AnswerDto } from './answer.dto';

export class UpdateAnswerDto extends PartialType(
  PickType(AnswerDto, ['answer_text', 'answer_weight'] as const)
) {}
