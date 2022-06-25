import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { TemplateService } from '../template/template.service';
import { TopicService } from '../topic/topic.service';

@Module({
  controllers: [CheckpointController],
  providers: [CheckpointService, TemplateService, TopicService],
})
export class CheckpointModule {}
