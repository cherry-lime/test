import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class SaveCheckpointDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  checkpoint_id: number;

  @ApiProperty({ default: 1 })
  answer_id: number;
}
