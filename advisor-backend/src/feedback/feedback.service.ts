import { Injectable } from '@nestjs/common';
import { Assessment } from '@prisma/client';
import { AssessmentDto } from '../assessment/dto/assessment.dto';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly checkpointService: CheckpointService
  ) {}

  async getRecommendations(
    { assessment_id, template_id }: Assessment,
    topic_id: number
  ) {
    // Get all saved answers for this assessment
    const answeredCheckpoints =
      await this.checkpointService.getSavedCheckpoints({
        assessment_id,
        template_id,
      } as AssessmentDto);

    answeredCheckpoints.filter((saved) => saved.answer_id);

    // Get all checkpoint ids of the saved answers
    const checkpoints = await this.getCheckpointsObject(
      answeredCheckpoints,
      topic_id
    );

    // Get all answer ids of the saved answers
    const answers = await this.getAnswersObject(answeredCheckpoints);

    // Map answered objective to object for sorting and returning
    const list = answeredCheckpoints
      .map((saved) => {
        const checkpoint = checkpoints[saved.checkpoint_id];
        const checkpointWeight = checkpoint.checkpoint_weight;
        const answerWeight = answers[saved.answer_id].answer_weight;
        const answerScore = checkpointWeight * answerWeight;
        const maturityOrder = checkpoint.Maturity.maturity_order;
        const categoryOrder = checkpoint.Category.category_order;
        return {
          data: {
            feedback_text: checkpoint.checkpoint_name,
            feedback_additional_information: checkpoint.checkpoint_description,
          },
          answerWeight,
          answerScore,
          maturityOrder,
          categoryOrder,
          weight: checkpointWeight,
        };
      })
      // Filter out checkpoints that are fully completed
      .filter((item) => item.answerWeight < 100);

    // Sort answer by maturity order, answer score, category order, and weight
    list.sort((a, b) => {
      if (a.maturityOrder === b.maturityOrder) {
        return this.compareAnswerScore(a, b);
      }
      return a.maturityOrder - b.maturityOrder;
    });

    // Return data as list of recommendations
    return list.map((item, index) => {
      return {
        ...item.data,
        order: ++index,
      };
    });
  }

  /**
   * Get all answers of the answered checkpoint as object
   * @param answeredCheckpoints List of answered checkpoints
   * @returns Object with answer_id as key and answer as value
   */
  private async getAnswersObject(answeredCheckpoints) {
    const answerIds = answeredCheckpoints.map(
      (checkpoint) => checkpoint.answer_id
    );

    const answersList = await this.prisma.answer.findMany({
      where: {
        answer_id: {
          in: answerIds,
        },
      },
    });

    const answers = {};
    answersList.forEach((answer) => {
      answers[answer.answer_id] = answer;
    });
    return answers;
  }

  /**
   * Get all checkpoints of the answered checkpoint as object
   * @param answeredCheckpoints List of answered checkpoints
   * @param topic_id Topic id to get checkpoint of
   * @returns Object with checkpoint_id as key and checkpoint as value
   */
  private async getCheckpointsObject(answeredCheckpoints, topic_id: number) {
    const checkpointIds = answeredCheckpoints.map(
      (checkpoint) => checkpoint.checkpoint_id
    );

    const checkpointsList = await this.prisma.checkpoint.findMany({
      where: {
        checkpoint_id: {
          in: checkpointIds,
        },
      },
      include: {
        Category: true,
        Maturity: true,
        CheckpointInTopic: true,
      },
    });

    checkpointsList.filter((checkpoint) => {
      return checkpoint.CheckpointInTopic.some(
        (checkpointInTopic) => checkpointInTopic.topic_id === topic_id
      );
    });

    const checkpoints = {};
    checkpointsList.forEach((checkpoint) => {
      checkpoints[checkpoint.checkpoint_id] = checkpoint;
    });
    return checkpoints;
  }

  /**
   * Compare answer score
   * @param a Answer object
   * @param b Answer object
   * @returns compare by category order if equal, otherwise difference of score
   */
  compareAnswerScore(a, b) {
    if (a.answerScore === b.answerScore) {
      return this.compareCategoryOrder(a, b);
    }
    return b.answerScore - a.answerScore;
  }

  /**
   * Compare category order
   * @param a Answer object
   * @param b Answer object
   * @returns compare by checkpoint weight if equal, otherwise difference of category order
   */
  compareCategoryOrder(a, b) {
    if (a.categoryOrder === b.categoryOrder) {
      return this.compareWeight(a, b);
    }
    return a.categoryOrder - b.categoryOrder;
  }

  /**
   * Compare checkpoint weight
   * @param a Answer object
   * @param b Answer object
   * @returns 0 if equal, otherwise difference of weight
   */
  compareWeight(a, b) {
    if (a.checkpointWeight === b.checkpointWeight) {
      return 0;
    }
    return a.checkpointWeight - b.checkpointWeight;
  }
}
