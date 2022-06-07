import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryDto } from '../category/dto/category.dto';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateDto } from './dto/template.dto';
import { TemplateService } from './template.service';

@Controller('template')
@ApiTags('template')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly categoryService: CategoryService
  ) {}

  /**
   * [GET] /template - Get all templates
   * @returns TemplateResponse[] List of all templates
   */
  @Get('')
  @ApiResponse({
    description: 'Found templates',
    type: TemplateDto,
    isArray: true,
  })
  async findAll(): Promise<TemplateDto[]> {
    return this.templateService.findAll();
  }

  /**
   * [POST] /template - Create a new template
   * @param body - Template name and type
   * @returns Created template
   */
  @Post('')
  @ApiResponse({ description: 'Created template', type: TemplateDto })
  @ApiConflictResponse({
    description: 'Template with this name and type already exists',
  })
  async create(
    @Body() { template_name, template_type }: CreateTemplateDto
  ): Promise<TemplateDto> {
    return this.templateService.create(template_name, template_type);
  }

  /**
   * [GET] /template/:id - Get template by id
   * @param id template_id
   * @returns Template object
   */
  @Get(':id')
  @ApiResponse({ description: 'Template', type: TemplateDto })
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TemplateDto> {
    return this.templateService.findOne(id);
  }

  /**
   * [PATCH] /template/:id - Update template by id
   * @param id template_id
   * @param updateTemplateDto Template data
   * @returns Updated template
   */
  @Patch(':id')
  @ApiResponse({ description: 'Template', type: TemplateDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @ApiConflictResponse({
    description: 'Template with this name and type already exists',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemplateDto: UpdateTemplateDto
  ): Promise<TemplateDto> {
    return this.templateService.update(id, updateTemplateDto);
  }

  /**
   * [DELETE] /template/:id - Delete template by id
   * @param id template_id
   * @returns Deleted template
   */
  @Delete(':id')
  @ApiResponse({ description: 'Deleted template', type: TemplateDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<TemplateDto> {
    return this.templateService.delete(id);
  }

  /**
   * [POST] /template/:id/clone - Clone template by id
   * @param id template_id
   * @returns Cloned template
   */
  @Post(':id/clone')
  @ApiResponse({ description: 'Template', type: TemplateDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  async clone(@Param('id', ParseIntPipe) id: number): Promise<TemplateDto> {
    return this.templateService.clone(id);
  }

  /**
   * [POST] /template/:id/category - Create new category for template
   * @param id template_id
   * @param body Category data
   * @returns Created category
   */
  @Post(':id/category')
  @ApiTags('category')
  @ApiResponse({ description: 'Category', type: CategoryDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @ApiConflictResponse({
    description: 'Category with this already exists',
  })
  async createCategory(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryDto> {
    return this.categoryService.create(id);
  }

  /**
   * [GET] /template/:id/category - Get all categories for template
   * @param id template_id
   * @returns CategoryResponse[] List of all categories
   */
  @Get(':id/category')
  @ApiTags('category')
  @ApiResponse({
    description: 'Found categories',
    type: CategoryDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Template not found' })
  async findAllCategories(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryDto[]> {
    return this.categoryService.findAll(id);
  }
}
