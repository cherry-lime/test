import { OmitType } from '@nestjs/swagger';
import { MaturityDto } from './maturity.dto';

export class CreateMaturityDto extends OmitType(MaturityDto, [
  'maturity_id',
] as const) {}
