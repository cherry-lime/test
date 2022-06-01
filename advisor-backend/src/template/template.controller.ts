import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTemplateDto } from './dto/CreateTemplateDto';
import { TemplateResponse } from './responses/TemplateResponse';
import { TemplateService } from './template.service';

@Controller('template')
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
  ) {
    return this.templateService.createTemplate(template_name, template_type);
  }
}
