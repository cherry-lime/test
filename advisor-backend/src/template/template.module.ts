import { Module } from '@nestjs/common';
import { MaturityService } from '../maturity/maturity.service';
import { CategoryService } from '../category/category.service';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TopicService } from 'src/topic/topic.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, CategoryService, MaturityService, TopicService],
})
export class TemplateModule {}
