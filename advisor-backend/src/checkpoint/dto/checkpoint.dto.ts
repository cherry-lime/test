import { ApiProperty } from '@nestjs/swagger';

export class CheckpointDto {
  @ApiProperty()
  checkpoint_id: number;

  @ApiProperty()
  checkpoint_description: string;

  @ApiProperty()
  checkpoint_additional_information: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  order: number;

  @ApiProperty()
  disabled: boolean;

  @ApiProperty()
  maturity_id: number;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  topics?: number[];
}
