import { OmitType, PartialType } from '@nestjs/swagger';
import { SubareaDto } from './subarea.dto';

export class UpdateSubareaDto extends PartialType(
  OmitType(SubareaDto, ['category_id', 'subarea_id'])
) {}
