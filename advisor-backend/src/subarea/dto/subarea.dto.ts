import { ApiProperty } from '@nestjs/swagger';

export class SubareaDto {
  @ApiProperty()
  subarea_id: number;

  @ApiProperty()
  subarea_name: string;

  @ApiProperty()
  subarea_description: string;

  @ApiProperty()
  subarea_summary: string;

  @ApiProperty()
  category_id: number;
}
