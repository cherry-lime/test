import { ApiProperty } from '@nestjs/swagger';

export class CheckpointDto {
  @ApiProperty()
  checkpoint_id: number;

  @ApiProperty()
  checkpoint_name: string;

  @ApiProperty()

  checkpoint_description: string;

  @ApiProperty()
  weight: number;


}
