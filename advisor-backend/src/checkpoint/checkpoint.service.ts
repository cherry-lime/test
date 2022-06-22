import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
@Injectable()
export class CheckpointService {
  constructor(private readonly prisma: PrismaService) {}
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

    return await this.prisma.checkpoint
      .create({
        data: {
          Category: {
            connect: {
              category_id,
            },
          },
          order: order + 1,
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
          throw new NotFoundException('Category not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Find all checkpoints in category
   * @param category_id category id
   * @returns all checkpoints in category
   */
  async findAll(category_id: number) {
    return await this.prisma.checkpoint.findMany({
      where: {
        category_id,
      },
    });
  }

  /**
   * Get checkpoint by id
   * @param checkpoint checkpoint id
   * @returns the checkpoint object
   * @throws Checkpoint not found
   */
  async findOne(checkpoint_id: number) {
    // Get checkpoint by id from prisma
    const checkpoint = await this.prisma.checkpoint.findUnique({
      where: {
        checkpoint_id,
      },
    });

    // Throw NotFoundException if checkpoint not found
    if (!checkpoint) {
      throw new NotFoundException('the checkpoint was not found');
    }

    return checkpoint;
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

    // Check if weight is within template weight range if weight is set
    if (updateCheckpointDto.weight) {
      const template = await this.prisma.template.findUnique({
        where: {
          template_id: checkpoint.Category.template_id,
        },
      });

      // Throw error if weight is not within range
      if (
        updateCheckpointDto.weight < template.weight_range_min ||
        updateCheckpointDto.weight > template.weight_range_max
      ) {
        throw new BadRequestException(
          'Weight is not within template weight range'
        );
      }
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

    // Update checkpoint
    return await this.prisma.checkpoint
      .update({
        where: {
          checkpoint_id,
        },
        data: updateCheckpointDto,
      })
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
        throw new InternalServerErrorException();
      });
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
    return await this.prisma.checkpoint
      .delete({
        where: {
          checkpoint_id,
        },
      })
      .catch((error) => {
        // Throw error if checkpoint not found
        if (error.code === 'P2025') {
          throw new NotFoundException('checkpoint was not found');
        }
        throw new InternalServerErrorException();
      });
  }
}
