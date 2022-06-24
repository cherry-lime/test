import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSubareaDto } from './dto/update-subarea.dto';

@Injectable()
export class SubareaService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create subarea
   * @param category_id category id to which subarea belongs
   * @param createSubareaDto subarea data
   * @returns created subarea
   * @throws Subarea with this name already exists
   * @throws Category not found
   */
  async create(category_id: number) {
    const order = await this.prisma.subArea.count({
      where: {
        category_id,
      },
    });

    return await this.prisma.subArea
      .create({
        data: {
          category_id,
          order: order + 1,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ConflictException('Subarea with this name already exists');
        } else if (error.code === 'P2003') {
          throw new NotFoundException('Category not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Find all subareas in category
   * @param category_id category id
   * @returns all subareas in category
   */
  async findAll(category_id: number) {
    return await this.prisma.subArea.findMany({
      where: {
        category_id,
      },
    });
  }

  /**
   * Get subarea by id
   * @param subarea_id subarea id
   * @returns subarea
   * @throws Subarea not found
   */
  async findOne(subarea_id: number) {
    const subarea = await this.prisma.subArea.findUnique({
      where: {
        subarea_id,
      },
    });

    // throw error if subarea not found
    if (!subarea) {
      throw new NotFoundException('Subarea not found');
    }

    return subarea;
  }

  /**
   * Update subarea
   * @param subarea_id subarea id
   * @param updateSubareaDto subarea data
   * @returns updated subarea
   * @throws Subarea not found
   * @throws Subarea with this name already exists
   */
  async update(subarea_id: number, updateSubareaDto: UpdateSubareaDto) {
    const subarea = await this.prisma.subArea.findUnique({
      where: {
        subarea_id,
      },
    });

    if (!subarea) {
      throw new NotFoundException('Subarea not found');
    }

    // Update order if order is changed
    if (updateSubareaDto.order) {
      // If new order is lower, increment everything between new and old order
      if (updateSubareaDto.order < subarea.order) {
        await this.prisma.subArea.updateMany({
          where: {
            category_id: subarea.category_id,
            order: {
              gte: updateSubareaDto.order,
              lte: subarea.order,
            },
          },
          data: {
            order: {
              increment: 1,
            },
          },
        });
      } else if (updateSubareaDto.order > subarea.order) {
        // If new order is higher, decrement everything between old and new order
        await this.prisma.subArea.updateMany({
          where: {
            category_id: subarea.category_id,
            order: {
              gte: subarea.order,
              lte: updateSubareaDto.order,
            },
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        });
      }
    }

    // Update subarea
    return await this.prisma.subArea
      .update({
        where: {
          subarea_id,
        },
        data: updateSubareaDto,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ConflictException('Subarea with this name already exists');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Delete subarea
   * @param subarea_id subarea id
   * @returns deleted subarea
   * @throws Subarea not found
   */
  async delete(subarea_id: number) {
    const subarea = await this.prisma.subArea.findUnique({
      where: {
        subarea_id,
      },
    });

    if (!subarea) {
      throw new NotFoundException('Subarea not found');
    }

    // Create new order for all subareas after deleted subarea
    await this.prisma.subArea.updateMany({
      where: {
        category_id: subarea.category_id,
        order: {
          gte: subarea.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    // Delete subarea
    return await this.prisma.subArea
      .delete({
        where: {
          subarea_id,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }
}
