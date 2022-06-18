import { Injectable, NotFoundException } from '@nestjs/common';
import { AssessmentDto } from '../assessment/dto/assessment.dto';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly checkpointService: CheckpointService
  ) {}

  async getRecommendations(assessment_id: number, topic_id: number) {
    const { template_id } = await this.prisma.assessment.findUnique({
      where: {
        assessment_id,
      },
    });

    if (!template_id) {
      throw new NotFoundException(
        `Assessment with id ${assessment_id} not found`
      );
    }

    const answeredCheckpoints =
      await this.checkpointService.getSavedCheckpoints({
        assessment_id,
        template_id,
      } as AssessmentDto);

    const checkpointIds = [
      ...new Set(
        answeredCheckpoints.map((checkpoint) => checkpoint.checkpoint_id)
      ),
    ];

    const answerIds = [
      ...new Set(answeredCheckpoints.map((checkpoint) => checkpoint.answer_id)),
    ];

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

    const list = answeredCheckpoints.map((saved) => {
      const weight = checkpoints[saved.checkpoint_id].checkpoint_weight;

      const answerScore = answers[saved.answer_id].answer_weight * weight;

      const maturityOrder =
        checkpoints[saved.checkpoint_id].Maturity.maturity_order;

      const categoryOrder =
        checkpoints[saved.checkpoint_id].Category.category_order;
      return {
        answerScore,
        maturityOrder,
        categoryOrder,
        weight,
      };
    });

    list.sort((a, b) => {
      if (a.maturityOrder === b.maturityOrder) {
        return this.compareAnswerScore(a, b);
      }
      return a.maturityOrder - b.maturityOrder;
    });
  }

  compareAnswerScore(a, b) {
    if (a.answerScore === b.answerScore) {
      return this.compareCategoryOrder(a, b);
    }
    return b.answerScore - a.answerScore;
  }

  compareCategoryOrder(a, b) {
    if (a.categoryOrder === b.categoryOrder) {
      return this.compareWeight(a, b);
    }
    return a.categoryOrder - b.categoryOrder;
  }

  compareWeight(a, b) {
    if (a.weight === b.weight) {
      return 0;
    }
    return a.weight - b.weight;
  }
}
