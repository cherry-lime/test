import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  category_id: number;

  @ApiProperty()
  category_name: string;

  @ApiProperty()
  color: number;

  @ApiProperty()
  @Min(1)
  order: number;

  @ApiProperty()
  template_id: number;
}
