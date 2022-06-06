import { PartialType } from '@nestjs/swagger';
import { CreateMaturityDto } from './create-maturity.dto';

export class UpdateMaturityDto extends PartialType(CreateMaturityDto) {}
