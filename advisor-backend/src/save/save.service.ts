import { BadRequestException, Injectable } from '@nestjs/common';
import { AssessmentDto } from '../assessment/dto/assessment.dto';
import { SaveCheckpointDto } from './dto/save-checkpoint.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SaveService {
  constructor(private readonly prisma: PrismaService) {}

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
    const upsertData = {
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
    };

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

      upsertData.update.answer_id = null;
      delete upsertData.create.Answer;
    }

    // Upsert checkpoint and answer
    await this.prisma.checkpointAndAnswersInAssessments
      .upsert(upsertData)
      .catch(() => {
        // Throw BadRequestException if anything doesn't exist
        throw new BadRequestException();
      });

    return {
      msg: 'Checkpoint saved',
    };
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
        disabled: false,
      },
      include: {
        Checkpoint: true,
      },
    });

    // Get possible answers for template
    const answers = await this.prisma.answer.findMany({
      where: {
        template_id,
        disabled: false,
      },
    });

    // Get all disabled maturities to filter out checkpoints of disabled maturity
    const disabledMaturities = await this.prisma.maturity.findMany({
      where: {
        template_id,
        disabled: true,
      },
    });

    // Get checkpoints in assessment
    const checkpoints = categories
      .flatMap((category) => category.Checkpoint)
      .filter((c) => !c.disabled)
      .filter((c) => {
        return !disabledMaturities.some((m) => m.maturity_id === c.maturity_id);
      });

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
