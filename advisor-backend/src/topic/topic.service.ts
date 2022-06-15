import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create topic
   * @param template_id template id to which topic belongs
   * @returns created topic
   * @throws Topic with this name already exists
   * @throws Template with id does not exist
   */
  async create(template_id: number) {
    return await this.prisma.topic
      .create({
        data: {
          template_id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name and type not unique
          throw new ConflictException('Topic with this name already exists');
        } else if (error.code === 'P2003') {
          // Throw error if topic not found
          throw new NotFoundException('Topic not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Find all topics in template
   * @param template_id template id
   * @returns all topics in template
   */
  async findAll(template_id: number) {
    return await this.prisma.topic.findMany({
      where: {
        template_id,
      },
    });
  }

  /**
   * Find topic by id
   * @param topic_id topic id
   * @returns topic
   * @throws Topic with this id does not exist
   */
  async findOne(topic_id: number) {
    // Fetch topic from database
    const topic = await this.prisma.topic.findUnique({
      where: {
        topic_id,
      },
    });

    // Throw error if topic not found
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    // Return topic
    return topic;
  }

  /**
   * Update topic
   * @param topic_id topic id
   * @param updateTopicDto topic data
   * @returns updated topic
   * @throws Topic with this id does not exist
   * @throws Topic with this name already exists
   */
  async update(topic_id: number, updateTopicDto: UpdateTopicDto) {
    return await this.prisma.topic
      .update({
        where: {
          topic_id,
        },
        data: {
          ...updateTopicDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error ïf name and type not unique
          throw new ConflictException('Topic with this name already exists');
        } else if (error.code === 'P2025') {
          // Throw error if topic not found
          throw new NotFoundException('Topic not found');
        }
        throw new InternalServerErrorException();
      });
  }

  /**
   * Delete topic
   * @param topic_id topic id
   * @returns deleted topic
   * @throws Topic with this id does not exist
   */
  async delete(topic_id: number) {
    return this.prisma.topic
      .delete({
        where: {
          topic_id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          // Throw error if topic not found
          throw new NotFoundException('Topic not found');
        }
        throw new InternalServerErrorException();
      });
  }
}
