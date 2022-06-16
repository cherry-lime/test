import { ApiProperty } from '@nestjs/swagger';

export class SaveCheckpointDto {
  @ApiProperty()
  checkpoint_id: number;

  @ApiProperty()
  answer_id: number;
}
