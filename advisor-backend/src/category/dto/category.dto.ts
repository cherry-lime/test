import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  category_id: number;

  @ApiProperty()
  category_name: string;

  @ApiProperty()
  color: number;

  @ApiProperty()
  template_id: number;
}
