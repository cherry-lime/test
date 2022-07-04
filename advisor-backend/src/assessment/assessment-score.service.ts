import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssessmentType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ScoreDto } from './dto/score.dto';

@Injectable()
export class AssessmentScoreService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Calculate score for assessment for all topics or for one specific topic
   * @param assessment_id assessment_id
   * @param topic_id topic_id
   * @returns ScoreDto score data for all topics
   * @throws NotFoundException if assessment not found
   * @throws ForbiddenException if assessment type is INDIVIDUAL
   * @throws BadRequestException if assessment is not completed
   * @throws BadRequestException if no enabled maturities found associated to this template
   * @throws BadRequestException if no enabled categories found associated to this template
   * @throws BadRequestException if topic not found or not enabled for this template
   * @throws BadRequestException if no enabled checkpoints found associated to this template
   * @throws BadRequestException if no enabled possible answers found associated to this template
   */
  async getScore(assessment_id: number, topic_id: number) {
    // Getting template id and assessment type of the assessment
    const temp = await this.prisma.assessment.findUnique({
      where: {
        assessment_id,
      },
      select: {
        template_id: true,
        assessment_type: true,
        completed_at: true,
      },
    });

    if (!temp) {
      throw new NotFoundException(
        `Assessment with id ${assessment_id} not found`
      );
    }

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
        order: 'asc',
      },
    });

    if (maturityIds.length === 0) {
      throw new BadRequestException(
        'No enabled maturities found associated to this template'
      );
    }

    // Getting the ids of the maturities
    const maturityIdsList = maturityIds.map((maturity) => maturity.maturity_id);

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

    if (categoryIds.length === 0) {
      throw new BadRequestException(
        'No enabled categories found associated to this template'
      );
    }

    // Getting the ids of the categories
    const categoryIdsList = categoryIds.map((category) => category.category_id);

    const selectParam = {
      // Used in select part of prisma checkpoints query
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
      CheckpointInTopic: {},
    };

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

      selectParam['CheckpointInTopic'] = {
        // If topic_id is specified and valid then CheckpointInTopic is added
        //   to select statement
        where: {
          topic_id,
        },
        select: {
          checkpoint_id: true,
        },
      };
    }

    // Getting the ids of checkpoints which have are not disabled and are in
    //   maturityIds and categoryIds
    let checkpoints = await this.prisma.checkpoint.findMany({
      where: {
        disabled: false,
        maturity_id: {
          in: maturityIdsList,
        },
        category_id: {
          in: categoryIdsList,
        },
      },
      select: selectParam,
    });

    // Filtering out checkpoints which are not in topic if topic_id is specified
    // and have category_id and maturity_id which are in categoryIds and maturityIds
    checkpoints = checkpoints.filter(
      (c) =>
        maturityIds.some((m) => m.maturity_id === c.maturity_id) &&
        categoryIds.some((c) => c.category_id === c.category_id) &&
        (!topic_id || c.CheckpointInTopic.length > 0)
    );

    if (checkpoints.length === 0) {
      throw new BadRequestException(
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

    if (possibleAnswers.length === 0) {
      throw new BadRequestException(
        'No enabled possible answers found associated to this template'
      );
    }

    return this.calculateScores(
      possibleAnswers,
      maturityIdsList,
      categoryIdsList,
      checkpoints,
      topic_id
    ) as ScoreDto[];
  }

  // Calculate score for all topics or for one specific topic
  calculateScores(
    possibleAnswers,
    maturityIdsList,
    categoryIdsList,
    checkpoints,
    topic_id
  ) {
    const maturityIdsPositionInList = Object.assign(
      {},
      ...maturityIdsList.map((id, index) => ({ [id]: index }))
    );

    const categoryIdsPositionInList = Object.assign(
      {},
      ...categoryIdsList.map((id, index) => ({ [id]: index }))
    );

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
      maturityIdsList.length + 1
    )
      .fill(0)
      .map(() =>
        new Array(categoryIdsList.length + 1)
          .fill(0)
          .map(() => new Array(2).fill(0))
      );

    checkpoints.map(function (checkpoint) {
      const specificMaturityIndex =
        maturityIdsPositionInList[checkpoint.maturity_id];
      const specificCategoryIndex =
        categoryIdsPositionInList[checkpoint.category_id];

      if (
        (!topic_id || // If topic_id is not specified, calculate score for all topics
          (checkpoint.CheckpointInTopic && // If topic_id is specified, calculate score for one topic
            checkpoint.CheckpointInTopic.length > 0)) && // should be at least one checkpoint in topic
        Object.keys(possibleAnswersDictionary).includes(
          checkpoint.CheckpointAndAnswersInAssessments.map(
            (answer) => answer.answer_id
          )[0].toString()
        ) // Checkpoint asnwer has to be in possible answers
      ) {
        calculateScorePerCatoryPerMaturity[specificMaturityIndex][
          specificCategoryIndex
        ][0] += checkpoint.weight; // Weights of checkpoints per category per maturity
        calculateScorePerCatoryPerMaturity[specificMaturityIndex][
          specificCategoryIndex
        ][1] +=
          // Score per category per maturity
          (possibleAnswersDictionary[
            checkpoint.CheckpointAndAnswersInAssessments.map(
              (answer) => answer.answer_id
            )[0]
          ] *
            checkpoint.weight) /
          100;
      } else {
        calculateScorePerCatoryPerMaturity[specificMaturityIndex][
          specificCategoryIndex
        ] = [-1, -1];
      }
    });

    const scores = calculateScorePerCatoryPerMaturity.map((maturityIndex) =>
      maturityIndex.map(function (categoryIndex) {
        if (categoryIndex[0] === 0 || categoryIndex[0] === -1) {
          return -1;
        } else {
          return (categoryIndex[1] / categoryIndex[0]) * 100;
        }
      })
    );

    // Calculating overall score for each category
    for (let i = 0; i < categoryIdsList.length; i++) {
      let sum = 0;
      let sumWeights = 0;
      for (let j = 0; j < maturityIdsList.length; j++) {
        if (scores[j][i] !== -1) {
          sumWeights += calculateScorePerCatoryPerMaturity[j][i][0];
          sum += calculateScorePerCatoryPerMaturity[j][i][1];
        }
      }
      scores[maturityIdsList.length][i] = (sum / sumWeights) * 100;
      if (sumWeights === 0) {
        scores[maturityIdsList.length][i] = -1;
      }
    }

    // Calculating overall score for each maturity
    for (let i = 0; i < maturityIdsList.length; i++) {
      let sum = 0;
      let sumWeights = 0;
      for (let j = 0; j < categoryIdsList.length; j++) {
        if (scores[i][j] !== -1) {
          sumWeights += calculateScorePerCatoryPerMaturity[i][j][0];
          sum += calculateScorePerCatoryPerMaturity[i][j][1];
        }
      }
      scores[i][categoryIdsList.length] = (sum / sumWeights) * 100;
      if (sumWeights === 0) {
        scores[i][categoryIdsList.length] = -1;
      }
    }

    // Calculating overall score for the assessment
    let sum = 0;
    let sumWeights = 0;
    for (let i = 0; i < maturityIdsList.length; i++) {
      for (let j = 0; j < categoryIdsList.length; j++) {
        if (scores[i][j] !== -1) {
          sumWeights += calculateScorePerCatoryPerMaturity[i][j][0];
          sum += calculateScorePerCatoryPerMaturity[i][j][1];
        }
      }
    }
    scores[maturityIdsList.length][categoryIdsList.length] =
      (sum / sumWeights) * 100;
    if (sumWeights === 0) {
      scores[maturityIdsList.length][categoryIdsList.length] = -1;
    }

    const output: any = [];

    for (let i = 0; i < maturityIdsList.length; i++) {
      for (let j = 0; j < categoryIdsList.length; j++) {
        output.push({
          maturity_id: maturityIdsList[i],
          category_id: categoryIdsList[j],
          score: scores[i][j],
        });
      }
    }

    for (let i = 0; i < categoryIdsList.length; i++) {
      output.push({
        category_id: categoryIdsList[i],
        maturity_id: null,
        score: scores[maturityIdsList.length][i],
      });
    }

    for (let i = 0; i < maturityIdsList.length; i++) {
      output.push({
        category_id: null,
        maturity_id: maturityIdsList[i],
        score: scores[i][categoryIdsList.length],
      });
    }

    output.push({
      maturity_id: null,
      category_id: null,
      score: scores[maturityIdsList.length][categoryIdsList.length],
    });

    return output;
  }
}
