import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ default: 1 })
  category_id: number;

  @ApiProperty({ default: 'New Category' })
  category_name: string;

  @ApiProperty({ default: '#FF0000' })
  color: string;

  @ApiProperty({ default: 1 })
  @Min(1)
  order: number;

  @ApiProperty({ default: false })
  disabled: boolean;

  @ApiProperty({ default: 1 })
  template_id: number;
}
