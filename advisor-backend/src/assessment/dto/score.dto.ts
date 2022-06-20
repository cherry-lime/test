import { PickType } from '@nestjs/swagger';
import { ScorePerTopicDto } from './score-per-topic.dto';

export class ScoreDto extends PickType(ScorePerTopicDto, ['scores'] as const) {}
