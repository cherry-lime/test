import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * [GET] /category/:category_id - Get category by id
   * @param id - Template id
   * @returns CategoryDto
   */
  @Get(':category_id')
  @ApiResponse({
    description: 'Found category',
    type: CategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  findOne(@Param('category_id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  /**
   * [PATCH] /category/:category_id - Update category by id
   * @param id - Template id
   * @param updateCategoryDto - Template update information
   * @returns CategoryDto
   */
  @Patch(':category_id')
  @ApiResponse({ description: 'Updated category', type: CategoryDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiBadRequestResponse({
    description: 'Order must be less than number of categories in template',
  })
  update(
    @Param('category_id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  /**
   * [DELETE] /category/:category_id - Delete category
   * @param id - Category id
   * @returns Deleted category
   */
  @Delete(':category_id')
  @ApiResponse({ description: 'Deleted category', type: CategoryDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  delete(@Param('category_id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
