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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTemplateDto } from './dto/CreateTemplateDto';
import { UpdateTemplateDto } from './dto/UpdateTemplateDto';
import { TemplateResponse } from './responses/TemplateResponse';
import { TemplateService } from './template.service';

@Controller('template')
@ApiTags('template')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  /**
   * [GET] /template - Get all templates
   * @returns TemplateResponse[] List of all templates
   */
  @Get('')
  @ApiResponse({
    description: 'Found templates',
    type: TemplateResponse,
    isArray: true,
  })
  async getAllTemplates(): Promise<TemplateResponse[]> {
    return this.templateService.getAllTemplates();
  }

  /**
   * [POST] /template - Create a new template
   * @param body - Template name and type
   * @returns Created template
   */
  @Post('')
  @ApiResponse({ description: 'Created template', type: TemplateResponse })
  async createTemplate(
    @Body() { template_name, template_type }: CreateTemplateDto
  ): Promise<TemplateResponse> {
    return this.templateService.createTemplate(template_name, template_type);
  }

  /**
   * [GET] /template/:id - Get template by id
   * @param id template_id
   * @returns Template object
   */
  @Get(':id')
  @ApiResponse({ description: 'Template', type: TemplateResponse })
  async getTemplate(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TemplateResponse> {
    return this.templateService.getTemplate(id);
  }

  /**
   * Update template from template_id
   * @param id template_id
   * @param updateTemplateDto Template data
   * @returns Updated template
   */
  @Patch(':id')
  @ApiResponse({ description: 'Template', type: TemplateResponse })
  async updateTemplate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemplateDto: UpdateTemplateDto
  ): Promise<TemplateResponse> {
    return this.templateService.updateTemplate(id, updateTemplateDto);
  }

  /**
   * Delete template from template_id
   * @param id template_id
   * @returns Deleted template
   */
  @Delete(':id')
  @ApiResponse({ description: 'Deleted template', type: TemplateResponse })
  async deleteTemplate(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TemplateResponse> {
    return this.templateService.deleteTemplate(id);
  }

  /**
   * Clone template from template_id
   * @param id template_id
   * @returns Cloned template
   */
  @Post(':id/clone')
  @ApiResponse({ description: 'Template', type: TemplateResponse })
  async cloneTemplate(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TemplateResponse> {
    return this.templateService.cloneTemplate(id);
  }
}
