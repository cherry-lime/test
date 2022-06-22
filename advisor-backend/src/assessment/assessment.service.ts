import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AssessmentType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { FeedbackDto } from './dto/feedback.dto';
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

    const template = await this.prisma.template.findFirst({
      where: {
        template_type: createAssessmentDto.assessment_type,
        enabled: true,
      },
    });

    if (!template) {
      throw new BadRequestException('No active templates found');
    }

    return await this.prisma.assessment
      .create({
        data: {
          ...createAssessmentDto,
          template_id: template.template_id,
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
   * Add feedback to assessment
   * @param assessment_id assessment_id
   * @param feedbackDto feedback data
   * @returns updated assessment
   * @throws Assessment not found
   */
  async feedback(assessment_id: number, { feedback_text }: FeedbackDto) {
    return await this.prisma.assessment
      .update({
        where: {
          assessment_id,
        },
        data: {
          feedback_text,
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
}
