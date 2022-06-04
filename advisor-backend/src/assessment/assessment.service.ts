import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
   */
  async create(createAssessmentDto: CreateAssessmentDto) {
    return await this.prisma.assessment
      .create({
        data: {
          ...createAssessmentDto,
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
    return await this.prisma.assessment
      .findFirst({
        where: {
          assessment_id: id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2001') {
          throw new NotFoundException('Assessment not found');
        } else {
          throw new InternalServerErrorException();
        }
      });
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
}
