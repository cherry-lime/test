import { OmitType } from '@nestjs/swagger';
import { SubareaDto } from './subarea.dto';

export class CreateSubareaDto extends OmitType(SubareaDto, ['subarea_id']) {}
