import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubareaService } from '../subarea/subarea.service';
import { SubareaDto } from '../subarea/dto/subarea.dto';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subareaService: SubareaService
  ) {}
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

  /**
   * [GET] /category/:subarea_id/subarea - Get all subareas
   * @param id category id
   * @returns subareas
   */
  @Get(':subarea_id/subarea')
  @ApiTags('subarea')
  @ApiResponse({
    description: 'The found subareas',
    type: SubareaDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  findAllSubareas(@Param('subarea_id', ParseIntPipe) id: number) {
    return this.subareaService.findAll(id);
  }

  /**
   * [POST] /category/:subarea_id/subarea - Create new subarea
   * @param id category id
   * @param subareaDto subarea data
   * @returns created subarea
   */
  @Post(':subarea_id/subarea')
  @ApiTags('subarea')
  @ApiResponse({
    description: 'The created subarea',
    type: SubareaDto,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiConflictResponse({ description: 'Subarea with this name already exists' })
  createSubarea(@Param('subarea_id', ParseIntPipe) id: number) {
    return this.subareaService.create(id);
  }
}
