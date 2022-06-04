import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssessmentType, Template } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateResponse } from './responses/TemplateResponse';

@Injectable()
export class TemplateService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all templates
   * @returns All templates
   */
  async findAll(): Promise<TemplateResponse[]> {
    // Return all templates from prisma
    return await this.prisma.template.findMany();
  }

  /**
   * Create template
   * @param template_name Template name
   * @param template_type Template type
   * @returns Created template
   */
  async create(
    template_name: string,
    template_type: AssessmentType
  ): Promise<TemplateResponse> {
    try {
      return await this.prisma.template.create({
        data: {
          template_name,
          template_type,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Template with this name and type already exists'
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Get template by id
   * @param id template_id
   * @returns Template object
   * @throws Template not found
   */
  async findOne(id: number): Promise<TemplateResponse> {
    // Get template by id from prisma
    const template = await this.prisma.template
      .findFirst({
        where: {
          template_id: id,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    // Throw error if template not found
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return template;
  }

  /**
   * Update template
   * @param id template_id
   * @param updateTemplateDto Template properties
   * @returns Updated template
   * @throws Template not found
   */
  async update(
    id: number,
    updateTemplateDto: UpdateTemplateDto
  ): Promise<TemplateResponse> {
    // Update template with id and data
    return await this.prisma.template
      .update({
        where: {
          template_id: id,
        },
        data: updateTemplateDto,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name and type not unique
          throw new ConflictException(
            'Template with this name and type already exists'
          );
        } else if (error.code === 'P2025') {
          // Throw error if template not found
          throw new NotFoundException('Template not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Clone template
   * @param id template_id
   * @returns Cloned template
   * @throws Template not found
   */
  async clone(id: number): Promise<TemplateResponse> {
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

    let newTemplate: Template;
    let template_name = template.template_name;

    delete template.template_id;
    delete template.template_name;

    // While template is not created
    while (!newTemplate) {
      // Update name with copy
      template_name = `${template_name} (Copy)`;
      try {
        // Try to create new template from original template
        newTemplate = await this.prisma.template.create({
          data: {
            template_name,
            ...template,
          },
        });
      } catch (error) {
        if (error.code !== 'P2002') {
          throw new InternalServerErrorException();
        }
      }
    }
    return newTemplate;
  }

  /**
   * Delete template from template_id
   * @param id template_id
   * @returns Deleted template
   * @throws Template not found
   */
  async delete(id: number): Promise<TemplateResponse> {
    // Delete template by id from prisma
    return await this.prisma.template
      .delete({
        where: {
          template_id: id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          // Throw error if template not found
          throw new NotFoundException('Template not found');
        }
        throw new InternalServerErrorException();
      });
  }
}
