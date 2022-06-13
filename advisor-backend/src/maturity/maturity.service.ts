import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMaturityDto } from './dto/update-maturity.dto';

@Injectable()
export class MaturityService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create maturity
   * @param template_id template id to which maturity belongs
   * @returns created maturity
   * @throws Maturity with this name already exists
   * @throws Template with id does not exist
   */
  async create(template_id: number) {
    const maturity_order = await this.prisma.maturity.count({
      where: {
        template_id,
      },
    });

    return await this.prisma.maturity
      .create({
        data: {
          template_id,
          maturity_order: maturity_order + 1,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name and type not unique
          throw new ConflictException('Maturity with this name already exists');
        } else if (error.code === 'P2003') {
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
   * @throws Maturity not found
   */
  async findOne(maturity_id: number) {
    // Get template by id from prisma
    const maturity = await this.prisma.maturity.findUnique({
      where: {
        maturity_id,
      },
    });

    // Throw NotFoundException if maturity not found
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
   */
  async update(maturity_id: number, updateMaturityDto: UpdateMaturityDto) {
    if (updateMaturityDto.maturity_order) {
      const maturity = await this.prisma.maturity.findUnique({
        where: {
          maturity_id,
        },
      });

      // If maturity is not found throw NotFoundException
      if (!maturity) {
        throw new NotFoundException('Maturity not found');
      }

      // Check if order is valid (not more than number of maturity in template)
      const maturity_order = await this.prisma.maturity.count({
        where: {
          template_id: maturity.template_id,
        },
      });

      // If order is not valid throw BadRequestException
      if (updateMaturityDto.maturity_order > maturity_order) {
        throw new BadRequestException(
          'Maturity order must be less than number of maturities in template'
        );
      }

      // If new order is smaller than old order, increase order of all maturities with between new and old order
      if (updateMaturityDto.maturity_order < maturity.maturity_order) {
        await this.prisma.maturity.updateMany({
          where: {
            template_id: maturity.template_id,
            maturity_order: {
              gte: updateMaturityDto.maturity_order,
              lte: maturity.maturity_order,
            },
          },
          data: {
            maturity_order: {
              increment: 1,
            },
          },
        });
      } else if (updateMaturityDto.maturity_order > maturity.maturity_order) {
        // If new order is bigger than old order, decrease order of all maturities with between old and new order
        await this.prisma.maturity.updateMany({
          where: {
            template_id: maturity.template_id,
            maturity_order: {
              gte: maturity.maturity_order,
              lte: updateMaturityDto.maturity_order,
            },
          },
          data: {
            maturity_order: {
              decrement: 1,
            },
          },
        });
      }
    }

    // Update maturity
    return await this.prisma.maturity
      .update({
        where: {
          maturity_id,
        },
        data: updateMaturityDto,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name not unique
          throw new ConflictException('Maturity with this name already exists');
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
   * @throws Maturity not found
   */
  async delete(maturity_id: number) {
    // Get maturity by id from prisma
    const maturity = await this.prisma.maturity.findUnique({
      where: {
        maturity_id,
      },
    });

    // Throw NotFoundException if maturity not found
    if (!maturity) {
      throw new NotFoundException('Maturity not found');
    }

    // Decrement order of all maturities with order bigger than deleted maturity
    await this.prisma.maturity.updateMany({
      where: {
        template_id: maturity.template_id,
        maturity_order: {
          gte: maturity.maturity_order,
        },
      },
      data: {
        maturity_order: {
          decrement: 1,
        },
      },
    });

    // Delete maturity
    return await this.prisma.maturity
      .delete({
        where: {
          maturity_id,
        },
      })
      .catch((error) => {
        // Throw error if template not found
        if (error.code === 'P2025') {
          throw new NotFoundException('Maturity not found');
        }
        throw new InternalServerErrorException();
      });
  }
}
