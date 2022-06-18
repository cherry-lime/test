import { BadRequestException, Injectable } from '@nestjs/common';
import { AssessmentDto } from '../assessment/dto/assessment.dto';
import { SaveCheckpointDto } from '../assessment/dto/save-checkpoint.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Injectable()
export class CheckpointService {
  constructor(private prisma: PrismaService) {}

  create(createCheckpointDto: CreateCheckpointDto) {
    return 'This action adds a new checkpoint';
  }

  findAll() {
    return `This action returns all checkpoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkpoint`;
  }

  update(id: number, updateCheckpointDto: UpdateCheckpointDto) {
    return `This action updates a #${id} checkpoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkpoint`;
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
