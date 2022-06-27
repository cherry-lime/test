import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CheckpointDto {
  @ApiProperty({ default: 1 })
  checkpoint_id: number;

  @ApiProperty({ default: 'New Checkpoint' })
  checkpoint_description: string;

  @ApiProperty({ default: '' })
  checkpoint_additional_information: string;

  @ApiProperty({ default: 3 })
  weight: number;

  @ApiProperty({ default: 1 })
  @Min(1)
  order: number;

  @ApiProperty({ default: false })
  disabled: boolean;

  @ApiProperty({ default: 1 })
  maturity_id: number;

  @ApiProperty({ default: 1 })
  category_id: number;

  @ApiProperty({ default: [1] })
  topics: number[];
}
