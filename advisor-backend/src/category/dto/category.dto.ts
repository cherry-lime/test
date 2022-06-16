import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ default: 1 })
  category_id: number;

  @ApiProperty({ default: 'New Category' })
  category_name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  @Min(1)
  order: number;

  @ApiProperty({ default: 1 })
  template_id: number;
}
