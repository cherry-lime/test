import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTemplateDto } from './dto/CreateTemplateDto';
import { TemplateResponse } from './responses/TemplateResponse';
import { TemplateService } from './template.service';

@Controller('template')
@ApiTags('template')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

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
   * Get template by id
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
}
