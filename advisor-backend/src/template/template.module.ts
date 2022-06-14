import { Module } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, CategoryService],
})
export class TemplateModule {}
