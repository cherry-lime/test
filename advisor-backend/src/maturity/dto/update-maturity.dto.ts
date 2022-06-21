import { OmitType, PartialType } from '@nestjs/swagger';
import { MaturityDto } from './maturity.dto';

export class UpdateMaturityDto extends PartialType(
  OmitType(MaturityDto, ['maturity_id', 'template_id'] as const)
) {}
