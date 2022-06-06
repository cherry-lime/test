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
      throw new NotFoundException();
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
    return await this.prisma.assessment
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
}
