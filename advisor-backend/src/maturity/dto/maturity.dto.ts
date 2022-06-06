import { ApiProperty } from '@nestjs/swagger';

export class MaturityDto {
  @ApiProperty()
  maturity_id: number;

  @ApiProperty()
  maturity_name: string;

  @ApiProperty()
  maturity_order: number;

  @ApiProperty()
  template_id: number;
}
