import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Assessment, AssessmentType, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { SaveCheckpointDto } from './dto/save-checkpoint.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create assessment
   * @param createAssessmentDto Assessment data
   * @returns created assessment
   * @throws Assessment with this name and type already exists
   * @throws Team id is required for team assessment
   * @throws Team with id does not exist
   * @throws team_id is not allowed for individual assessment
   */
  async create(createAssessmentDto: CreateAssessmentDto) {
    let users = [{ user_id: (await this.prisma.user.findFirst()).user_id }];
    if (createAssessmentDto.assessment_type === AssessmentType.TEAM) {
      if (!createAssessmentDto.team_id) {
        throw new BadRequestException(
          'Team id is required for team assessment'
        );
      }

      const team = await this.prisma.team.findUnique({
        where: {
          team_id: createAssessmentDto.team_id,
        },
        include: {
          UserInTeam: true,
        },
      });

      if (!team) {
        throw new NotFoundException(
          `Team with id ${createAssessmentDto.team_id} not found`
        );
      }

      users = team.UserInTeam.map((user) => ({
        user_id: user.user_id,
      }));
    } else {
      if (createAssessmentDto.team_id) {
        throw new BadRequestException(
          'Team id is not required for individual assessment'
        );
      }
    }

    return await this.prisma.assessment
      .create({
        data: {
          ...createAssessmentDto,
          AssessmentParticipants: {
            create: users,
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Assessment with this name and type already exists'
          );
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Find all assessments
   * @returns All assessments
   */
  async findAll() {
    return await this.prisma.assessment.findMany();
  }

  /**
   * Find assessment by id
   * @param id assessment_id
   * @returns Found assessment
   * @throws Assessment not found
   */
  async findOne(id: number) {
    const assessment = await this.prisma.assessment
      .findUnique({
        where: {
          assessment_id: id,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    // throw NotFoundException if assessment not found
    if (!assessment) {
      throw new NotFoundException('Assessment not found');
    }

    return assessment;
  }

  /**
   * Update an assessment
   * @param id assessment_id
   * @param updateAssessmentDto updated assessment data
   * @returns Updated assessment
   * @throws Assessment not found
   * @throws Assessment with this name and type already exists
   */
  async update(id: number, updateAssessmentDto: UpdateAssessmentDto) {
    return await this.prisma.assessment
      .update({
        where: {
          assessment_id: id,
        },
        data: {
          ...updateAssessmentDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Assessment not found');
        } else if (error.code === 'P2002') {
          throw new ConflictException(
            'Assessment with this name and type already exists'
          );
        } else {
          throw new InternalServerErrorException();
        }
      });
  }

  /**
   * Delete an assessment
   * @param id assessment_id
   * @returns deleted assessment
   * @throws Assessment not found
   */
  async delete(id: number) {
    const deleteAssessment = this.prisma.assessment
      .delete({
        where: {
          assessment_id: id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Assessment not found');
        } else {
          throw new InternalServerErrorException();
        }
      });

    const deleteParticipants = this.prisma.assessmentParticipants.deleteMany({
      where: {
        assessment_id: id,
      },
    });

    await Promise.all([deleteAssessment, deleteParticipants]);

    return deleteAssessment;
  }

  /**
   * Mark assessment as completed
   * @param id assessment_id
   * @returns updated assessment
   * @throws Assessment not found
   */
  async complete(id: number) {
    return await this.prisma.assessment
      .update({
        where: {
          assessment_id: id,
        },
        data: {
          completed_at: new Date(),
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Assessment not found');
        } else {
          throw new InternalServerErrorException();
        }
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
    assessment_id: number,
    { checkpoint_id, answer_id }: SaveCheckpointDto
  ) {
    // Save NA to checkpoint if no answer_id is provided
    if (!answer_id) {
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
  async getSavedCheckpoints({ assessment_id, template_id }: Assessment) {
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

  /**
   * Check if user is part of assessment
   * @param assessment_id assessment_id
   * @param user user
   * @returns assessment if member, null otherwise
   */
  async userInAssessment(assessment_id: number, user: User) {
    const assessment = await this.prisma.assessment.findUnique({
      where: {
        assessment_id,
      },
      include: {
        AssessmentParticipants: true,
      },
    });

    if (!assessment) {
      return null;
    }

    const userInAssessment = assessment.AssessmentParticipants.find(
      (participant) => {
        return participant.user_id === user.user_id;
      }
    );

    if (!userInAssessment) {
      return null;
    }

    return assessment;
  }
}
