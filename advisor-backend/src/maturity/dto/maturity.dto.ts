import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class MaturityDto {
  @ApiProperty({ default: 1 })
  maturity_id: number;

  @ApiProperty({ default: 'New Maturity' })
  maturity_name: string;

  @ApiProperty()
  @Min(1)
  maturity_order: number;

  @ApiProperty({ default: 1 })
  template_id: number;
}
