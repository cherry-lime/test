import { OmitType, PartialType } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';

export class UpdateCategoryDto extends PartialType(
  OmitType(CategoryDto, ['category_id', 'template_id'] as const)
) {}
