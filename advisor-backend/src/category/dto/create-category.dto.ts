import { OmitType } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';

export class CreateCategoryDto extends OmitType(CategoryDto, [
  'category_id',
  'template_id',
] as const) {}
