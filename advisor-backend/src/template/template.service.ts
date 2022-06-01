import { Injectable } from '@nestjs/common';
import { AssessmentType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new template
   * @returns Created template
   */
  async createTemplate(template_name: string, template_type: AssessmentType) {
    return await this.prisma.template.create({
      data: {
        template_name,
        template_type,
      },
    });
  }
}
