import { PartialType,OmitType } from '@nestjs/swagger';
import { CreateCheckpointDto } from './create-checkpoint.dto';
import { CheckpointDto } from './checkpoint.dto';
export class UpdateCheckpointDto extends PartialType(CreateCheckpointDto){
OmitType(CheckpointDto, ['checkpoint_id','category_id'] as const)
} {}
