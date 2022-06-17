
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
@Injectable()
export class CheckpointService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCheckpointDto: CreateCheckpointDto) {
    return 'This action adds a new checkpoint';
  }

  findAll() {
    return `This action returns all checkpoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkpoint`;
  }

  update(id: number, updateCheckpointDto: UpdateCheckpointDto) {
    return `This action updates a #${id} checkpoint`;
  }

  /**
   * Delete checkpoint
   * @param checkpoint_id checkpoint id
   * @returns deleted checkpoint
   * @throws checkpoint not found
   */
   async delete(checkpoint_id: number) {
    // Get checkpoint by id from prisma
    const checkpoint = await this.prisma.checkpoint.findUnique({
      where: {
        checkpoint_id,
      },
    });

    // Throw NotFoundException if checkpoint not found
    if (!checkpoint) {
      throw new NotFoundException('checkpoint not found');
    }

    // Decrement order of all categories with order bigger than deleted checkpoint
    await this.prisma.checkpoint.updateMany({
      where: {
        category_id: checkpoint.category_id,
        order: {
          gte: checkpoint.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    // Delete checkpoint
    return await this.prisma.checkpoint
      .delete({
        where: {
          checkpoint_id,
        },
      })
      .catch((error) => {
        // Throw error if category not found
        if (error.code === 'P2025') {
          throw new NotFoundException('checkpoint not found');
        }
        throw new InternalServerErrorException();
      });
  }
}
