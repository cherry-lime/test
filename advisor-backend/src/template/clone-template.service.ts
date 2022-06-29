import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Checkpoint } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateDto } from './dto/template.dto';

@Injectable()
export class CloneTemplateService {
  constructor(private prisma: PrismaService) {}

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
      throw new InternalServerErrorException('Failed to create new template');
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
      const newC = { ...c };
      newC.category_id = categoryMap[c.category_id];
      newC.maturity_id = maturityMap[c.maturity_id];
      delete newC.checkpoint_id;
      return newC;
    });

    await this.prisma.checkpoint.createMany({
      data: newCheckpoints,
    });

    await this.linkTopics(newTemplate, template, categoriesList, checkpoints);

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
    delete newTemplate.Topic;
    return newTemplate;
  }

  /**
   * Link checkpoints to topics in new template
   * @param newTemplate
   * @param template
   * @param categoriesList
   */
  private async linkTopics(
    newTemplate: any,
    template: any,
    categoriesList: number[],
    checkpoints: Checkpoint[]
  ) {
    // Get topics from old checkpoints and new checkpoints
    const [checkpointInTopics, newCheckpoints] = await this.prisma.$transaction(
      [
        this.prisma.checkpointInTopic.findMany({
          where: {
            topic_id: {
              in: template.Topic.map((t) => t.topic_id),
            },
          },
        }),
        this.prisma.checkpoint.findMany({
          where: {
            category_id: {
              in: categoriesList,
            },
          },
        }),
      ]
    );

    const checkpointsMap = this.createMap(
      checkpoints,
      newCheckpoints,
      'checkpoint',
      'description',
      'category_id'
    );

    const topicsMap = this.createMap(
      template.Topic,
      newTemplate.Topic,
      'topic'
    );

    const newCheckpointInTopics = checkpointInTopics.map((c) => {
      c.topic_id = topicsMap[c.topic_id];
      c.checkpoint_id = checkpointsMap[c.checkpoint_id];
      return c;
    });

    await this.prisma.checkpointInTopic.createMany({
      data: newCheckpointInTopics,
    });
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
            ...template,
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
            Topic: true,
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
  createMap(
    oldEntity,
    newEntity,
    type: string,
    compareField = 'name',
    secondField: string = null
  ) {
    const idString = `${type}_id`;
    const nameString = `${type}_${compareField}`;
    const map = {};
    oldEntity.forEach((e) => {
      map[e[idString]] = newEntity.find((n) => {
        if (n[nameString] === e[nameString]) {
          if (!secondField) return true;
          return n[secondField] === e[secondField];
        }
        return false;
      })[idString];
    });
    return map;
  }
}
