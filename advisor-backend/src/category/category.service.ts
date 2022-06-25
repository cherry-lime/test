import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create category
   * @param template_id template id to which category belongs
   * @param createCategoryDto category data
   * @returns created category
   * @throws Category with this name already exists
   * @throws Template with id does not exist
   */
  async create(template_id: number) {
    const order = await this.prisma.category.count({
      where: {
        template_id,
      },
    });

    return await this.prisma.category
      .create({
        data: {
          template_id,
          order: order + 1,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name and type not unique
          throw new ConflictException(
            'Template with this name and type already exists'
          );
        } else if (error.code === 'P2003') {
          // Throw error if template not found
          throw new NotFoundException('Template not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Find all categories in template
   * @param template_id template id
   * @returns all categories in template
   */
  async findAll(template_id: number) {
    return await this.prisma.category.findMany({
      where: {
        template_id,
      },
    });
  }

  /**
   * Get category by id
   * @param category_id category id
   * @returns category object
   * @throws Category not found
   */
  async findOne(category_id: number) {
    // Get template by id from prisma
    const category = await this.prisma.category.findUnique({
      where: {
        category_id,
      },
    });

    // Throw NotFoundException if category not found
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  /**
   * Update category
   * @param category_id category id
   * @param updateCategoryDto category data
   * @returns updated category
   */
  async update(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    // Get category by id from prisma
    const category = await this.prisma.category.findUnique({
      where: {
        category_id,
      },
    });

    // Throw NotFoundException if category not found
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const newOrder = updateCategoryDto.order;
    // Update orders if order changed
    if (newOrder) {
      // Check if order is valid (not more than number of categories in template)
      const order = await this.prisma.category.count({
        where: {
          template_id: category.template_id,
        },
      });

      if (newOrder > order) {
        throw new BadRequestException(
          'Order must be less than number of categories in template'
        );
      }
    }

    // Update category
    const newCategory = await this.prisma.category
      .update({
        where: {
          category_id,
        },
        data: updateCategoryDto,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name not unique
          throw new ConflictException('Category with this name already exists');
        } else if (error.code === 'P2025') {
          // Throw error if template not found
          throw new NotFoundException('Template not found');
        }
        throw new InternalServerErrorException();
      });

    // If new order is smaller than old order, increase order of all categories with between new and old order
    if (newOrder && newOrder < category.order) {
      await this.prisma.category.updateMany({
        where: {
          template_id: category.template_id,
          category_id: {
            not: category.category_id,
          },
          order: {
            gte: updateCategoryDto.order,
            lte: category.order,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    } else if (newOrder && newOrder > category.order) {
      // If new order is bigger than old order, decrease order of all categories with between old and new order
      await this.prisma.category.updateMany({
        where: {
          template_id: category.template_id,
          category_id: {
            not: category.category_id,
          },
          order: {
            gte: category.order,
            lte: updateCategoryDto.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    }

    return newCategory;
  }

  /**
   * Delete category
   * @param category_id category id
   * @returns deleted category
   * @throws Category not found
   */
  async delete(category_id: number) {
    // Get category by id from prisma
    const category = await this.prisma.category.findUnique({
      where: {
        category_id,
      },
    });

    // Throw NotFoundException if category not found
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Decrement order of all categories with order bigger than deleted category
    await this.prisma.category.updateMany({
      where: {
        template_id: category.template_id,
        order: {
          gte: category.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    // Delete category
    return await this.prisma.category
      .delete({
        where: {
          category_id,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }
}
