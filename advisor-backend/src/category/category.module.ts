import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SubareaService } from '../subarea/subarea.service';
import { CheckpointService } from 'src/checkpoint/checkpoint.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, SubareaService, CheckpointService],
})
export class CategoryModule {}
