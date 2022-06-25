import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class SubareaDto {
  @ApiProperty({ default: 1 })
  subarea_id: number;

  @ApiProperty({ default: 'New Subarea' })
  subarea_name: string;

  @ApiProperty({ default: '' })
  subarea_description: string;

  @ApiProperty({ default: '' })
  subarea_summary: string;

  @ApiProperty({ default: 1 })
  category_id: number;

  @ApiProperty({ default: false })
  disabled: boolean;

  @ApiProperty({ default: 1 })
  @Min(1)
  order: number;
}
