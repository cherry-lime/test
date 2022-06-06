import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
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
  async create(template_id: number, createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category
      .create({
        data: {
          ...createCategoryDto,
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
    return await this.prisma.category
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
  }

  /**
   * Delete category
   * @param category_id category id
   * @returns deleted category
   * @throws Category not found
   */
  async delete(category_id: number) {
    return await this.prisma.category
      .delete({
        where: {
          category_id,
        },
      })
      .catch((error) => {
        // Throw error if template not found
        if (error.code === 'P2025') {
          throw new NotFoundException('Category not found');
        }
        throw new InternalServerErrorException();
      });
  }
}
