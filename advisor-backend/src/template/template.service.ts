import { Injectable, NotFoundException } from '@nestjs/common';
import { AssessmentType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateResponse } from './responses/TemplateResponse';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new template
   * @returns Created template
   */
  async createTemplate(
    template_name: string,
    template_type: AssessmentType
  ): Promise<TemplateResponse> {
    return await this.prisma.template.create({
      data: {
        template_name,
        template_type,
      },
    });
  }

  /**
   * Get template by id
   * @param id template_id
   * @returns Template object
   * @throws Template not found
   */
  async getTemplate(id: number): Promise<TemplateResponse> {
    // Get template by id from prisma
    const template = await this.prisma.template.findFirst({
      where: {
        template_id: id,
      },
    });

    // Throw error if template not found
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    // Return template
    return template;
  }
}
