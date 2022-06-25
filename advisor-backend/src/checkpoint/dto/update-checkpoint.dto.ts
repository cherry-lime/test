import { PartialType, OmitType, ApiPropertyOptional } from '@nestjs/swagger';
import { CheckpointDto } from './checkpoint.dto';
export class UpdateCheckpointDto extends PartialType(
  OmitType(CheckpointDto, ['checkpoint_id', 'category_id'] as const)
) {
  @ApiPropertyOptional()
  topics?: number[];
}
