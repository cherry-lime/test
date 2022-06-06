import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMaturityDto } from './create-maturity.dto';

export class UpdateMaturityDto extends PartialType(
  OmitType(CreateMaturityDto, ['template_id'] as const)
) {}
