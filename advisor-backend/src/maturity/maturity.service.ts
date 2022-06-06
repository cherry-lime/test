import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaturityDto } from './dto/create-maturity.dto';
import { UpdateMaturityDto } from './dto/update-maturity.dto';

@Injectable()
export class MaturityService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create maturity in template
   * @param template_id template id to which maturity belongs
   * @param createMaturityDto maturity data
   * @returns created maturity
   * @throws Maturity with this name already exists
   * @throws Template with id does not exist
   */
  async create(template_id: number, createMaturityDto: CreateMaturityDto) {
    return this.prisma.maturity
      .create({
        data: {
          ...createMaturityDto,
          template_id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name and type not unique
          throw new ConflictException(
            'Template with this name and type already exists'
          );
        } else if (error.code === 'P2025') {
          // Throw error if template not found
          throw new NotFoundException('Template not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Find all maturities in template
   * @param template_id template id
   * @returns all maturities in template
   */
  async findAll(template_id: number) {
    return await this.prisma.maturity.findMany({
      where: {
        template_id,
      },
    });
  }

  /**
   * Get maturity by id
   * @param maturity_id maturity id
   * @returns maturity
   * @throws Maturity with id does not exist
   */
  async findOne(maturity_id: number) {
    const maturity = await this.prisma.maturity.findUnique({
      where: {
        maturity_id,
      },
    });

    // Throw error if maturity not found
    if (!maturity) {
      throw new NotFoundException('Maturity not found');
    }

    return maturity;
  }

  /**
   * Update maturity
   * @param maturity_id maturity id
   * @param updateMaturityDto maturity data
   * @returns updated maturity
   * @throws Maturity with id does not exist
   * @throws Maturity with this name already exists
   */
  async update(maturity_id: number, updateMaturityDto: UpdateMaturityDto) {
    return await this.prisma.maturity
      .update({
        where: {
          maturity_id,
        },
        data: updateMaturityDto,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error if name and type not unique
          throw new ConflictException(
            'Template with this name and type already exists'
          );
        } else if (error.code === 'P2025') {
          // Throw error if template not found
          throw new NotFoundException('Template not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Delete maturity
   * @param maturity_id maturity id
   * @returns deleted maturity
   * @throws Maturity with id does not exist
   */
  async remove(maturity_id: number) {
    return await this.prisma.maturity
      .delete({
        where: {
          maturity_id,
        },
      })
      .catch((error) => {
        // Throw error if template not found
        if (error.code === 'P2025') {
          throw new NotFoundException('Template not found');
        }
        throw new InternalServerErrorException();
      });
  }
}
