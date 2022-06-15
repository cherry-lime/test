import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from '../category/category.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateDto } from './dto/template.dto';
import { TemplateService } from './template.service';
import { MaturityDto } from '../maturity/dto/maturity.dto';
import { MaturityService } from '../maturity/maturity.service';
import { CategoryDto } from '../category/dto/category.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '@prisma/client';

@Controller('template')
@ApiTags('template')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly categoryService: CategoryService,
    private readonly maturityService: MaturityService
  ) {}

  /**
   * [GET] /template - Get all templates
   * @returns TemplateResponse[] List of all templates
   */
  @ApiResponse({
    description: 'Found templates',
    type: TemplateDto,
    isArray: true,
  })
  @Get('')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async create(
    @Body() { template_type }: CreateTemplateDto
  ): Promise<TemplateDto> {
    return this.templateService.create(template_type);
  }

  /**
   * [GET] /template/:id - Get template by id
   * @param id template_id
   * @returns Template object
   */
  @Get(':template_id')
  @ApiResponse({ description: 'Template', type: TemplateDto })
  @ApiNotFoundResponse()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async findOne(
    @Param('template_id', ParseIntPipe) id: number
  ): Promise<TemplateDto> {
    return this.templateService.findOne(id);
  }

  /**
   * [PATCH] /template/:id - Update template by id
   * @param id template_id
   * @param updateTemplateDto Template data
   * @returns Updated template
   */
  @Patch(':template_id')
  @ApiResponse({ description: 'Template', type: TemplateDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @ApiConflictResponse({
    description: 'Template with this name and type already exists',
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('template_id', ParseIntPipe) id: number,
    @Body() updateTemplateDto: UpdateTemplateDto
  ): Promise<TemplateDto> {
    return this.templateService.update(id, updateTemplateDto);
  }

  /**
   * [DELETE] /template/:id - Delete template by id
   * @param id template_id
   * @returns Deleted template
   */
  @Delete(':template_id')
  @ApiResponse({ description: 'Deleted template', type: TemplateDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async delete(
    @Param('template_id', ParseIntPipe) id: number
  ): Promise<TemplateDto> {
    return this.templateService.delete(id);
  }

  /**
   * [POST] /template/:id/clone - Clone template by id
   * @param id template_id
   * @returns Cloned template
   */
  @Post(':template_id/clone')
  @ApiResponse({ description: 'Template', type: TemplateDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async clone(
    @Param('template_id', ParseIntPipe) id: number
  ): Promise<TemplateDto> {
    return this.templateService.clone(id);
  }

  /**
   * [POST] /template/:id/category - Create new category for template
   * @param id template_id
   * @param body Category data
   * @returns Created category
   */
  @Post(':template_id/category')
  @ApiTags('category')
  @ApiResponse({ description: 'Category', type: CategoryDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @ApiConflictResponse({
    description: 'Category with this already exists',
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async createCategory(
    @Param('template_id', ParseIntPipe) id: number
  ): Promise<CategoryDto> {
    return this.categoryService.create(id);
  }

  /**
   * [GET] /template/:id/category - Get all categories for template
   * @param id template_id
   * @returns CategoryResponse[] List of all categories
   */
  @Get(':template_id/category')
  @ApiTags('category')
  @ApiResponse({
    description: 'Found categories',
    type: CategoryDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async findAllCategories(
    @Param('template_id', ParseIntPipe) id: number
  ): Promise<CategoryDto[]> {
    return this.categoryService.findAll(id);
  }

  /**
   * [POST] /template/:template_id/maturity - Create new maturity for template
   * @param id template_id
   * @param body Maturity data
   * @returns Created maturity
   */
  @Post(':template_id/maturity')
  @ApiTags('maturity')
  @ApiResponse({ description: 'Maturity', type: MaturityDto })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @ApiConflictResponse({
    description: 'Maturity with this name already exists',
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async createMaturity(
    @Param('template_id', ParseIntPipe) id: number
  ): Promise<MaturityDto> {
    return this.maturityService.create(id);
  }

  /**
   * [GET] /template/:template_id/maturity - Get all maturity for template
   * @param id template_id
   * @returns MaturityDto[] List of all maturity
   * @throws NotFoundException if template not found
   */
  @Get(':template_id/maturity')
  @ApiTags('maturity')
  @ApiResponse({
    description: 'Found maturities',
    type: MaturityDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Template not found' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async findAllMaturities(
    @Param('template_id', ParseIntPipe) id: number
  ): Promise<MaturityDto[]> {
    return this.maturityService.findAll(id);
  }
}
