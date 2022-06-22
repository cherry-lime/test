import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SaveCheckpointDto } from '../assessment/dto/save-checkpoint.dto';
import { AssessmentDto } from '../assessment/dto/assessment.dto';
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

  /**
   * Save checkpoint for assessment
   * @param assessment_id assessment_id
   * @param saveCheckpointDto checkpoint data
   * @returns checkpoint saved
   * @throws Assessment not found
   */
  async saveCheckpoint(
    { assessment_id, template_id }: AssessmentDto,
    { checkpoint_id, answer_id }: SaveCheckpointDto
  ) {
    // Save NA to checkpoint if no answer_id is provided
    if (!answer_id) {
      // Check if NA is allowed
      const template = await this.prisma.template.findUnique({
        where: {
          template_id,
        },
      });

      if (!template.include_no_answer) {
        throw new BadRequestException(
          'No answer is not allowed in this template'
        );
      }

      return await this.saveNaAnswer(assessment_id, checkpoint_id);
    }

    // Upsert checkpoint and answer
    await this.prisma.checkpointAndAnswersInAssessments
      .upsert({
        where: {
          assessment_id_checkpoint_id: {
            assessment_id,
            checkpoint_id,
          },
        },
        update: {
          answer_id,
        },
        create: {
          assessment: {
            connect: {
              assessment_id,
            },
          },
          checkpoint: {
            connect: {
              checkpoint_id,
            },
          },
          Answer: {
            connect: {
              answer_id,
            },
          },
        },
      })
      .catch(() => {
        // Throw BadRequestException if anything doesn't exist
        throw new BadRequestException();
      });

    return {
      msg: 'Checkpoint saved',
    };
  }

  /**
   * Save NA answer to checkpoint
   * @param assessment_id assessment_id
   * @param checkpoint_id checkpoint_id
   * @returns checkpoint saved
   */
  async saveNaAnswer(assessment_id, checkpoint_id) {
    const saved =
      await this.prisma.checkpointAndAnswersInAssessments.findUnique({
        where: {
          assessment_id_checkpoint_id: {
            assessment_id,
            checkpoint_id,
          },
        },
      });

    if (!saved) {
      await this.prisma.checkpointAndAnswersInAssessments.create({
        data: {
          assessment_id,
          checkpoint_id,
        },
      });
    } else {
      await this.prisma.checkpointAndAnswersInAssessments.update({
        where: {
          assessment_id_checkpoint_id: {
            assessment_id,
            checkpoint_id,
          },
        },
        data: {
          answer_id: null,
        },
      });
    }

    return { msg: 'Checkpoint saved' };
  }

  /**
   * Find all saved checkpoints for assessment
   * @param assessment_id assessment_id
   * @returns all saved checkpoints
   * @throws Assessment not found
   */
  async getSavedCheckpoints({ assessment_id, template_id }: AssessmentDto) {
    // Get categories in assessment template
    const categories = await this.prisma.category.findMany({
      where: {
        template_id,
      },
      include: {
        Checkpoint: true,
      },
    });

    // Get possible answers for template
    const answers = await this.prisma.answer.findMany({
      where: {
        template_id,
      },
    });

    // Get checkpoints in assessment
    const checkpoints = categories.flatMap((category) => category.Checkpoint);

    // find all saved answers in assessment
    return (
      await this.prisma.checkpointAndAnswersInAssessments.findMany({
        where: {
          assessment_id,
          checkpoint_id: {
            in: checkpoints.map((checkpoint) => checkpoint.checkpoint_id),
          },
        },
      })
    ).filter(
      (saved) =>
        saved.answer_id === null ||
        answers.map((answer) => answer.answer_id).includes(saved.answer_id)
    );
  }
}
