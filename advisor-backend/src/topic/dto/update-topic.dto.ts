import { PartialType, PickType } from '@nestjs/swagger';
import { TopicDto } from './topic.dto';

export class UpdateTopicDto extends PartialType(
  PickType(TopicDto, ['topic_name', 'disabled'])
) {}
