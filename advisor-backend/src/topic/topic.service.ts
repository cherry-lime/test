import { Injectable } from '@nestjs/common';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  create(template_id: number) {
    return 'This action adds a new topic';
  }

  findAll(template_id: number) {
    return `This action returns all topic`;
  }

  findOne(topic_id: number) {
    return `This action returns a #${topic_id} topic`;
  }

  update(topic_id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${topic_id} topic`;
  }

  remove(topic_id: number) {
    return `This action removes a #${topic_id} topic`;
  }
}
