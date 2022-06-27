import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssessmentType, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateDto } from './dto/template.dto';

@Injectable()
export class TemplateService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all templates
   * @returns All templates
   */
  async findAll(role: Role): Promise<TemplateDto[]> {
    // Return all templates from prisma
    const data: Prisma.TemplateFindManyArgs = {
      where: {},
    };

    if (role !== Role.ADMIN) {
      data.where.enabled = true;
    }

    return await this.prisma.template.findMany(data);
  }

  /**
   * Create template
   * @param template_name Template name
   * @param template_type Template type
   * @returns Created template
   */
  async create(template_type: AssessmentType): Promise<TemplateDto> {
    const templateCount = await this.prisma.template.count({
      where: {
        template_type,
      },
    });

    const enabled = templateCount === 0;

    return await this.prisma.template
      .create({
        data: {
          template_type,
          enabled,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Template with this name and type already exists'
          );
        } else {
          console.log(error);
          throw new InternalServerErrorException();
        }
      });
  }

  /**
   * Get template by id
   * @param id template_id
   * @returns Template object
   * @throws Template not found
   */
  async findOne(id: number): Promise<TemplateDto> {
    // Get template by id from prisma
    const template = await this.prisma.template.findUnique({
      where: {
        template_id: id,
      },
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
  ): Promise<TemplateDto> {
    // Update template with id and data
    const template = await this.prisma.template
      .update({
        where: {
          template_id: id,
        },
        data: updateTemplateDto,
        include: {
          Category: {
            include: {
              Checkpoint: true,
            },
          },
        },
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
        console.log(error);
        throw new InternalServerErrorException();
      });

    if (
      updateTemplateDto.weight_range_max ||
      updateTemplateDto.weight_range_min
    ) {
      const categories = template.Category.map(
        (category) => category.category_id
      );

      if (updateTemplateDto.weight_range_min) {
        if (updateTemplateDto.weight_range_min > template.weight_range_max) {
          throw new ConflictException(
            'Weight range min must be less than weight range max'
          );
        } else if (
          updateTemplateDto.weight_range_max < template.weight_range_min
        ) {
          throw new ConflictException(
            'Weight range max must be greater than weight range min'
          );
        }
      }
      await this.prisma.checkpoint.updateMany({
        where: {
          category_id: {
            in: categories,
          },
          weight: {
            gt: updateTemplateDto.weight_range_max,
          },
        },
        data: {
          weight: {
            set: updateTemplateDto.weight_range_max,
          },
        },
      });

      await this.prisma.checkpoint.updateMany({
        where: {
          category_id: {
            in: categories,
          },
          weight: {
            lt: updateTemplateDto.weight_range_min,
          },
        },
        data: {
          weight: {
            set: updateTemplateDto.weight_range_min,
          },
        },
      });
    }

    if (updateTemplateDto.enabled) {
      // Disable all other templates with same type
      await this.prisma.template.updateMany({
        where: {
          template_type: template.template_type,
          NOT: {
            template_id: template.template_id,
          },
        },
        data: {
          enabled: false,
        },
      });
    }

    delete template.Category;
    return template;
  }

  /**
   * Delete template from template_id
   * @param id template_id
   * @returns Deleted template
   * @throws Template not found
   */
  async delete(id: number): Promise<TemplateDto> {
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
        console.log(error);
        throw new InternalServerErrorException();
      });
  }

  async checkWeightRange(template_id, weight) {
    if (weight === undefined) {
      return true;
    }

    const template = await this.findOne(template_id).catch(() => {
      throw new NotFoundException('Template not found');
    });

    return (
      weight >= template.weight_range_min && weight <= template.weight_range_max
    );
  }
}
