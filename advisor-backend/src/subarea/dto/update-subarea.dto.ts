import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSubareaDto } from './create-subarea.dto';

export class UpdateSubareaDto extends PartialType(
  OmitType(CreateSubareaDto, ['category_id'])
) {}
