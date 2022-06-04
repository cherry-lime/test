import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { AssessmentResponse } from './responses/AssessmentResponse';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  /**
   * [POST] /assessment - create new assessment
   * @param createAssessmentDto Assessment information
   * @returns created assessment
   */
  @Post()
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.create(createAssessmentDto);
  }

  /**
   * [GET] /assessment - get all assessments
   * @returns AssessmentResponse[] List of all assessments
   */
  @Get()
  @ApiResponse({
    description: 'Found assessments',
    type: AssessmentResponse,
    isArray: true,
  })
  findAll() {
    return this.assessmentService.findAll();
  }

  /**
   * [GET] /assessment/:id - get assessment by id
   * @param id assessment_id
   * @returns Assessment object
   */
  @Get(':id')
  @ApiResponse({ description: 'Assessment', type: AssessmentResponse })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assessmentService.findOne(id);
  }

  /**
   * [PATCH] /assessment/:id - update assessment by id
   * @param id assessment_id
   * @param updateAssessmentDto updated assessment information
   * @returns
   */
  @Patch(':id')
  @ApiResponse({ description: 'Assessment', type: AssessmentResponse })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssessmentDto: UpdateAssessmentDto
  ) {
    return this.assessmentService.update(id, updateAssessmentDto);
  }

  /**
   * [DELETE] /assessment/:id - delete assessment by id
   * @param id assessment_id
   * @returns deleted Assessment object
   */
  @Delete(':id')
  @ApiResponse({ description: 'Assessment', type: AssessmentResponse })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.assessmentService.delete(id);
  }
}
