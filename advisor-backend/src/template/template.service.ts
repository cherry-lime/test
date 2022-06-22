import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssessmentType, Template } from '@prisma/client';
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
  async findAll(): Promise<TemplateDto[]> {
    // Return all templates from prisma
    return await this.prisma.template.findMany();
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
    const template = await this.prisma.template
      .findUnique({
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
  ): Promise<TemplateDto> {
    // Update template with id and data
    const template = await this.prisma.template
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

    return template;
  }

  /**
   * Clone template
   * @param template_id template_id
   * @returns Cloned template
   * @throws Template not found
   */
  async clone(template_id: number): Promise<TemplateDto> {
    // Get template by id from prisma
    const template = await this.prisma.template.findUnique({
      where: {
        template_id,
      },
      include: {
        Category: true,
        Answers: true,
        Maturity: true,
        Topic: true,
      },
    });

    // Throw error if template not found
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    // Clone template
    const newTemplate = await this.cloneTemplate(template);

    // Throw error if failed
    if (!newTemplate) {
      throw new InternalServerErrorException();
    }

    const categoryMap = this.createMap(
      template.Category,
      newTemplate.Category,
      'category'
    );

    const maturityMap = this.createMap(
      template.Maturity,
      newTemplate.Maturity,
      'maturity'
    );

    const categoriesList = template.Category.map((c) => c.category_id);

    const checkpoints = await this.prisma.checkpoint.findMany({
      where: {
        category_id: {
          in: categoriesList,
        },
      },
    });

    const newCheckpoints = checkpoints.map((c) => {
      c.category_id = categoryMap[c.category_id];
      c.maturity_id = maturityMap[c.maturity_id];
      delete c.checkpoint_id;
      return c;
    });

    await this.prisma.checkpoint.createMany({
      data: newCheckpoints,
    });

    const newSubareas = await this.prisma.subArea.findMany({
      where: {
        category_id: {
          in: categoriesList,
        },
      },
    });

    const newSubareasWithCategory = newSubareas.map((s) => {
      s.category_id = categoryMap[s.category_id];
      delete s.subarea_id;
      return s;
    });

    await this.prisma.subArea.createMany({
      data: newSubareasWithCategory,
    });

    delete newTemplate.Category;
    delete newTemplate.Maturity;
    return newTemplate;
  }

  /**
   * Clone the actual template itself
   * @param template Template to clone
   * @returns Cloned template
   */
  async cloneTemplate(template: any) {
    const deleteIds = (a) => {
      const temp = { ...a };
      delete temp.template_id;
      delete temp.category_id;
      delete temp.answer_id;
      delete temp.maturity_id;
      delete temp.topic_id;
      return temp;
    };

    const createCat = template.Category.map(deleteIds);
    const createAns = template.Answers.map(deleteIds);
    const createMat = template.Maturity.map(deleteIds);
    const createTop = template.Topic.map(deleteIds);

    let newTemplate;
    let template_name = template.template_name;

    delete template.template_id;
    delete template.template_name;
    template.enabled = false;

    // While template is not created
    while (!newTemplate) {
      // Update name with copy
      template_name = `${template_name} (Copy)`;
      try {
        // Try to create new template from original template
        newTemplate = await this.prisma.template.create({
          data: {
            template_name,
            template_type: template.template_type,
            weight_range_min: template.weight_range_min,
            weight_range_max: template.weight_range_max,
            enabled: template.enabled,
            Category: {
              create: createCat,
            },
            Answers: {
              create: createAns,
            },
            Maturity: {
              create: createMat,
            },
            Topic: {
              create: createTop,
            },
          },
          include: {
            Category: true,
            Maturity: true,
          },
        });
      } catch (error) {
        if (error.code !== 'P2002') {
          return null;
        }
      }
    }
    return newTemplate;
  }

  /**
   * Create map from old to new id
   * @param oldEntity old entity
   * @param newEntity new entity
   * @param type type of entity
   * @returns Map of old to new id
   */
  createMap(oldEntity, newEntity, type: string) {
    const idString = `${type}_id`;
    const nameString = `${type}_name`;
    const map = {};
    oldEntity.forEach((e) => {
      map[e[idString]] = newEntity.find((n) => n[nameString] === e[nameString])[
        idString
      ];
    });
    return map;
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
        throw new InternalServerErrorException();
      });
  }
}
