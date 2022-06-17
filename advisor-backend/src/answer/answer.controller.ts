import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dto/answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answer')
@ApiTags('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  /**
   * [GET] /answer/:answer_id - get answer by id
   * @param answer_id answer_id
   * @returns Answer object
   */
  @Get(':answer_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    description: 'Found answer',
    type: AnswerDto,
  })
  @ApiNotFoundResponse({ description: 'Answer not found' })
  findOne(@Param('answer_id', ParseIntPipe) answer_id: number) {
    return this.answerService.findOne(answer_id);
  }

  /**
   * [PATCH] /answer/:answer_id - update answer by id
   * @param answer_id answer_id
   * @param updateAnswerDto Answer information
   * @returns updated answer
   */
  @Patch(':answer_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    description: 'Updated answer',
    type: AnswerDto,
  })
  @ApiNotFoundResponse({ description: 'Answer not found' })
  @ApiConflictResponse({ description: 'Answer with this name already exists' })
  update(
    @Param('answer_id', ParseIntPipe) answer_id: number,
    @Body() updateAnswerDto: UpdateAnswerDto
  ) {
    return this.answerService.update(answer_id, updateAnswerDto);
  }

  /**
   * [DELETE] /answer/:answer_id - delete answer by id
   * @param answer_id answer_id
   * @returns deleted answer
   */
  @Delete(':answer_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    description: 'Deleted answer',
    type: AnswerDto,
  })
  @ApiNotFoundResponse({ description: 'Answer not found' })
  delete(@Param('answer_id', ParseIntPipe) answer_id: number) {
    return this.answerService.delete(answer_id);
  }
}
