import { Module } from '@nestjs/common';
import { MaturityService } from '../maturity/maturity.service';
import { CategoryService } from '../category/category.service';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, CategoryService, MaturityService],
})
export class TemplateModule {}
