import { Injectable } from '@nestjs/common';
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
}
