import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssessmentType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssessmentScoreService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Calculate score for assessment for all topics or for one specific topic
   * @param assessment_id assessment_id
   * @param topic_id topic_id
   * @returns ScoreDto score data for all topics
   * @throws NotFoundException if assessment not found
   * @throws InternalServerErrorException
   * @throws ForbiddenException if assessment type is INDIVIDUAL
   * @throws BadRequestException if assessment is not completed
   * @throws BadRequestException if no enabled maturities found associated to this template
   * @throws BadRequestException if no enabled categories found associated to this template
   * @throws BadRequestException if topic not found or not enabled for this template
   * @throws BadRequestException if no enabled checkpoints found associated to this template
   */
  async getScore(assessment_id: number, topic_id: number) {
    // Getting template id and assessment type of the assessment
    const temp = await this.prisma.assessment
      .findUnique({
        where: {
          assessment_id,
        },
        select: {
          template_id: true,
          assessment_type: true,
          completed_at: true,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Assessment not found');
        } else {
          throw new InternalServerErrorException();
        }
      });

    if (temp.assessment_type === AssessmentType.INDIVIDUAL) {
      throw new ForbiddenException('Individual assessment cannot be scored');
    } else if (!temp.completed_at) {
      throw new BadRequestException('Assessment not completed');
    }

    // Getting the ids of maturities which are not disabled
    const maturityIds = await this.prisma.maturity.findMany({
      where: {
        template_id: temp.template_id,
        disabled: false,
      },
      orderBy: {
        maturity_order: 'asc',
      },
    });

    if (!maturityIds) {
      return new BadRequestException(
        'No enabled maturities found associated to this template'
      );
    }

    const maturityIdsList = maturityIds.map((maturity) => maturity.maturity_id);
    const maturityIdsPositionInList = Object.assign(
      {},
      ...maturityIdsList.map((id, index) => ({ [id]: index }))
    );

    // Getting the ids of categories which are not disabled
    const categoryIds = await this.prisma.category.findMany({
      where: {
        template_id: temp.template_id,
        disabled: false,
      },
      orderBy: {
        order: 'asc',
      },
    });

    if (!categoryIds) {
      return new BadRequestException(
        'No enabled categories found associated to this template'
      );
    }

    const categoryIdsList = categoryIds.map((category) => category.category_id);
    const categoryIdsPositionInList = Object.assign(
      {},
      ...categoryIdsList.map((id, index) => ({ [id]: index }))
    );

    let checkpoints;

    if (topic_id) {
      // If topic_id is specified, calculate score for one topic

      // Checking if topic exists and is enabled
      const topic = await this.prisma.topic.findFirst({
        where: {
          template_id: temp.template_id,
          disabled: false,
          topic_id,
        },
      });

      if (!topic) {
        throw new BadRequestException(
          'Topic not found or not enabled for this template'
        );
      }

      // Getting the ids of checkpoints which have are not disabled and are
      //   in maturityIds and categoryIds and are associated to topic with topic_id
      checkpoints = await this.prisma.checkpoint.findMany({
        where: {
          disabled: false,
          maturity_id: {
            in: maturityIdsList,
          },
          category_id: {
            in: categoryIdsList,
          },
        },
        select: {
          maturity_id: true,
          category_id: true,
          weight: true,
          CheckpointAndAnswersInAssessments: {
            where: {
              assessment_id: assessment_id,
            },
            select: {
              answer_id: true,
              assessment_id: true,
            },
          },
          CheckpointInTopic: {
            where: {
              topic_id,
            },
            select: {
              checkpoint_id: true,
            },
          },
        },
      });
    } else {
      // If topic_id is not specified, calculate score for all topics

      // Getting the ids of checkpoints which have are not disabled and are in
      //   maturityIds and categoryIds
      checkpoints = await this.prisma.checkpoint.findMany({
        where: {
          disabled: false,
          maturity_id: {
            in: maturityIdsList,
          },
          category_id: {
            in: categoryIdsList,
          },
        },
        select: {
          checkpoint_id: true,
          maturity_id: true,
          category_id: true,
          weight: true,
          CheckpointAndAnswersInAssessments: {
            where: {
              assessment_id: assessment_id,
            },
            select: {
              answer_id: true,
              checkpoint_id: true,
              assessment_id: true,
            },
          },
        },
      });
    }

    if (!checkpoints) {
      return new BadRequestException(
        'No enabled checkpoints found associated to this template'
      );
    }

    // Getting all possible answers that are not disabled per template
    const possibleAnswers = await this.prisma.answer.findMany({
      where: {
        template_id: temp.template_id,
        disabled: false,
      },
      select: {
        answer_id: true,
        answer_weight: true,
      },
    });

    // Creating dictionary with possible answers for quicker lookup of answer
    // weights
    const possibleAnswersDictionary = Object.assign(
      {},
      ...possibleAnswers.map((answer) => ({
        [answer.answer_id]: answer.answer_weight,
      }))
    );

    // Storing sum of weights and scores per category and per maturity
    //   (+ 1 for overall scores) (list filled with 0)
    // Dimensions: maturityIds.length + 1, categoryIds.length + 1, 2
    const calculateScorePerCatoryPerMaturity: number[][][] = new Array(
      maturityIds.length + 1
    )
      .fill(0)
      .map(() =>
        new Array(categoryIds.length + 1)
          .fill(0)
          .map(() => new Array(2).fill(0))
      );

    checkpoints.map(function (checkpoint) {
      if (
        !topic_id ||
        (checkpoint.CheckpointInTopic &&
          checkpoint.CheckpointInTopic.length > 0)
      ) {
        calculateScorePerCatoryPerMaturity[
          maturityIdsPositionInList[checkpoint.maturity_id]
        ][categoryIdsPositionInList[checkpoint.category_id]][0] =
          +checkpoint.weight; // Weights of checkpoints per category per maturity
        calculateScorePerCatoryPerMaturity[
          maturityIdsPositionInList[checkpoint.maturity_id]
        ][categoryIdsPositionInList[checkpoint.category_id]][1] =
          +(
            // Score per category per maturity
            possibleAnswersDictionary[
              checkpoint.CheckpointAndAnswersInAssessments.map(
                (a) => a.answer_id
              )[0]
            ]
          ) * checkpoint.weight;
      } else {
        calculateScorePerCatoryPerMaturity[
          maturityIdsPositionInList[checkpoint.maturity_id]
        ][categoryIdsPositionInList[checkpoint.category_id]] = [-1, -1];
      }
    });

    const scores = calculateScorePerCatoryPerMaturity.map((a) =>
      a.map(function (b) {
        if (b[0] === 0 || b[0] === -1) {
          return -1;
        } else {
          return (b[1] / b[0]) * 100;
        }
      })
    );

    // Calculating overall score for each category
    for (let i = 0; i < categoryIds.length; i++) {
      let sum = 0;
      let nrMaturitiesWithScore = 0; // Number of maturities that have scores for this category
      for (let j = 0; j < maturityIds.length; j++) {
        if (scores[j][i] !== -1) {
          nrMaturitiesWithScore++;
          sum += scores[j][i];
        }
      }
      scores[maturityIds.length][i] = sum / nrMaturitiesWithScore;
      if (sum === 0) {
        scores[maturityIds.length][i] = -1;
      }
    }

    // Calculating overall score for each maturity
    for (let i = 0; i < maturityIds.length; i++) {
      let sum = 0;
      let nrCategoriesWithScore = 0; // Number of categories that have scores for this maturity
      for (let j = 0; j < categoryIds.length; j++) {
        if (scores[i][j] !== -1) {
          nrCategoriesWithScore++;
          sum += scores[i][j];
        }
      }
      scores[i][categoryIds.length] = sum / nrCategoriesWithScore;
      if (sum === 0) {
        scores[i][categoryIds.length] = -1;
      }
    }

    // Calculating overall score for the assessment
    let sum = 0;
    let nrMaturitiesAndCategoriesWithOverallScore = 0; // Number of maturities and categories that have overall scores
    for (let i = 0; i < categoryIds.length; i++) {
      if (scores[maturityIds.length][i] !== -1) {
        nrMaturitiesAndCategoriesWithOverallScore++;
        sum += scores[maturityIds.length][i];
      }
    }
    for (let i = 0; i < maturityIds.length; i++) {
      if (scores[i][categoryIds.length] !== -1) {
        nrMaturitiesAndCategoriesWithOverallScore++;
        sum += scores[i][categoryIds.length];
      }
    }
    scores[maturityIds.length][categoryIds.length] =
      sum / nrMaturitiesAndCategoriesWithOverallScore;

    return scores as number[][];
  }
}
