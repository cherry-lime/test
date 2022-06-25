import { OmitType } from '@nestjs/swagger';
import { ScorePerTopicDto } from './score-per-topic.dto';

export class ScoreDto extends OmitType(ScorePerTopicDto, [
  'topic_id',
] as const) {}
