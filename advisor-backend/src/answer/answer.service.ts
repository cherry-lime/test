import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(template_id: number) {
    return await this.prisma.possibleAnswers.create({
      data: {
        template_id,
      },
    });
  }

  findAll(template_id: number) {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
