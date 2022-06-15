import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SubareaService } from '../subarea/subarea.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, SubareaService],
})
export class CategoryModule {}
