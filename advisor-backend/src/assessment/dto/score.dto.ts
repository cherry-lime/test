import { ApiProperty } from '@nestjs/swagger';

export class ScoreDto {
  @ApiProperty()
  category_id?: number;

  @ApiProperty()
  maturity_id?: number;

  @ApiProperty()
  score: number;
}
