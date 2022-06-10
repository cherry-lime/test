import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get(':category_id')
  findOne(@Param('category_id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':category_id')
  update(
    @Param('category_id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':category_id')
  delete(@Param('category_id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
