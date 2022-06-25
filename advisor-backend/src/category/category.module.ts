import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SubareaService } from '../subarea/subarea.service';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { TemplateService } from '../template/template.service';
import { TopicService } from '../topic/topic.service';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    SubareaService,
    CheckpointService,
    TemplateService,
    TopicService,
  ],
})
export class CategoryModule {}
