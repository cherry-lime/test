import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class SaveCheckpointDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  checkpoint_id: number;

  @ApiProperty()
  answer_id: number;
}
