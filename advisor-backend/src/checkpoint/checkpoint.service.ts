import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TemplateService } from '../template/template.service';
import { TopicService } from '../topic/topic.service';

@Injectable()
export class CheckpointService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly templateService: TemplateService,
    private readonly topicService: TopicService
  ) {}

  formatTopics(checkpoint: any) {
    checkpoint.topics = checkpoint.CheckpointInTopic.map((c) => c.topic_id);
    delete checkpoint.CheckpointInTopic;
    return checkpoint;
  }

  /**
   * Create checkpoint
   * @param category_id category id to which checkpoint belongs
   * @param createcheckpointDto checkpoint data
   * @returns created checkpoint
   * @throws checkpoint with this name already exists
   * @throws category with id does not exist
   */
  async create(category_id: number) {
    const order = await this.prisma.checkpoint.count({
      where: {
        category_id,
      },
    });

    const category = await this.prisma.category.findUnique({
      where: {
        category_id,
      },
      include: {
        Template: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const maturity = await this.prisma.maturity.findFirst({
      where: {
        template_id: category.Template.template_id,
      },
    });

    if (!maturity) {
      throw new NotFoundException('No maturities found');
    }

    const createdCheckpoint = await this.prisma.checkpoint
      .create({
        data: {
          Category: {
            connect: {
              category_id,
            },
          },
          Maturity: {
            connect: {
              maturity_id: maturity.maturity_id,
            },
          },
          order: order + 1,
        },
        include: {
          CheckpointInTopic: true,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name and type not unique
          throw new ConflictException(
            'category with this name and type already exists'
          );
        }
        if (error.code === 'P2025') {
          // Throw error if category not found
          throw new NotFoundException('Maturity not found');
        }
        throw new InternalServerErrorException();
      });
    return this.formatTopics(createdCheckpoint);
  }

  /**
   * Find all checkpoints in category
   * @param category_id category id
   * @returns all checkpoints in category
   */
  async findAll(category_id: number) {
    const foundCheckpoints = await this.prisma.checkpoint.findMany({
      where: {
        category_id,
      },
      include: {
        CheckpointInTopic: true,
      },
    });

    return foundCheckpoints.map((c) => this.formatTopics(c));
  }

  /**
   * Get checkpoint by id
   * @param checkpoint checkpoint id
   * @returns the checkpoint object
   * @throws Checkpoint not found
   */
  async findOne(checkpoint_id: number) {
    // Get checkpoint by id from prisma
    const checkpoint: any = await this.prisma.checkpoint.findUnique({
      where: {
        checkpoint_id,
      },
      include: {
        CheckpointInTopic: true,
      },
    });

    // Throw NotFoundException if checkpoint not found
    if (!checkpoint) {
      throw new NotFoundException('the checkpoint was not found');
    }

    return this.formatTopics(checkpoint);
  }

  /**
   * Update checkpoint
   * @param checkpoint_id checkpoint id
   * @param updateCheckpointDto checkpoint data
   * @returns updated checkpoint
   */
  async update(
    checkpoint_id: number,
    updateCheckpointDto: UpdateCheckpointDto
  ) {
    // Get checkpoint by id from prisma
    const checkpoint = await this.prisma.checkpoint.findUnique({
      where: {
        checkpoint_id,
      },
      include: {
        Category: true,
      },
    });

    // Throw NotFoundException if checkpointnot found
    if (!checkpoint) {
      throw new NotFoundException('checkpoint not found');
    }

    // Check if maturity exists if maturity_id is set
    if (updateCheckpointDto.maturity_id) {
      const maturity = await this.prisma.maturity.findUnique({
        where: {
          maturity_id: updateCheckpointDto.maturity_id,
        },
      });

      // Throw NotFoundException if maturity not found
      if (!maturity) {
        throw new NotFoundException('Maturity not found');
      }
    }

    // Check if weight is valid
    const isWeightCorrect = await this.templateService
      .checkWeightRange(
        checkpoint.Category.template_id,
        updateCheckpointDto.weight
      )
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    if (!isWeightCorrect) {
      throw new BadRequestException('Weight is outside of range');
    }

    // Update orders if order changed
    if (updateCheckpointDto.order) {
      // Check if order is valid (not more than number of categories in template)
      const order = await this.prisma.checkpoint.count({
        where: {
          category_id: checkpoint.category_id,
        },
      });

      if (updateCheckpointDto.order > order) {
        throw new BadRequestException(
          'Order must be less than number of checkpoints in the category'
        );
      }
      // If new order is smaller than old order, increase order of all categories with between new and old order
      if (updateCheckpointDto.order < checkpoint.order) {
        await this.prisma.checkpoint.updateMany({
          where: {
            category_id: checkpoint.category_id,
            order: {
              gte: updateCheckpointDto.order,
              lte: checkpoint.order,
            },
          },
          data: {
            order: {
              increment: 1,
            },
          },
        });
      } else if (updateCheckpointDto.order > checkpoint.order) {
        // If new order is bigger than old order, decrease order of all categories with between old and new order
        await this.prisma.checkpoint.updateMany({
          where: {
            category_id: checkpoint.category_id,
            order: {
              gte: checkpoint.order,
              lte: updateCheckpointDto.order,
            },
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        });
      }
    }

    const updateData: any = {
      where: {
        checkpoint_id,
      },
      data: updateCheckpointDto,
      include: {
        CheckpointInTopic: true,
      },
    };

    // Update topics and upsert them
    if (updateCheckpointDto.topics) {
      await this.topicService.updateTopics(
        checkpoint_id,
        updateData,
        updateCheckpointDto
      );
    }

    // Update checkpoint
    const updatedCheckpoint = await this.prisma.checkpoint
      .update(updateData)
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name not unique
          throw new ConflictException(
            'Checkpoint with this name already exists'
          );
        } else if (error.code === 'P2025') {
          // Throw error if category not found
          throw new NotFoundException('Category not found');
        }
        console.log(error);
        throw new InternalServerErrorException();
      });

    return this.formatTopics(updatedCheckpoint);
  }

  /**
   * Delete checkpoint
   * @param checkpoint_id checkpoint id
   * @returns deleted checkpoint
   * @throws checkpoint not found
   */
  async delete(checkpoint_id: number) {
    // Get checkpoint by id from prisma
    const checkpoint = await this.prisma.checkpoint.findUnique({
      where: {
        checkpoint_id,
      },
    });

    // Throw NotFoundException if checkpoint not found
    if (!checkpoint) {
      throw new NotFoundException('checkpoint not found');
    }

    // Decrement order of all categories with order bigger than deleted checkpoint
    await this.prisma.checkpoint.updateMany({
      where: {
        checkpoint_id: checkpoint.checkpoint_id,
        order: {
          gte: checkpoint.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    // Delete checkpoint
    const deletedCheckpoint = await this.prisma.checkpoint
      .delete({
        where: {
          checkpoint_id,
        },
        include: {
          CheckpointInTopic: true,
        },
      })
      .catch((error) => {
        // Throw error if checkpoint not found
        if (error.code === 'P2025') {
          throw new NotFoundException('checkpoint was not found');
        }
        throw new InternalServerErrorException();
      });

    await this.prisma.checkpointInTopic.deleteMany({
      where: {
        checkpoint_id,
      },
    });

    return this.formatTopics(deletedCheckpoint);
  }
}