import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { AssessmentDto } from './dto/assessment.dto';
import { FeedbackDto } from './dto/feedback.dto';
import { SaveCheckpointDto } from './dto/save-checkpoint.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role, User } from '@prisma/client';
import AuthUser from '../common/decorators/auth-user.decorator';
import { CheckpointService } from '../checkpoint/checkpoint.service';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly checkpointService: CheckpointService
  ) {}

  /**
   * [POST] /assessment - create new assessment
   * @param createAssessmentDto Assessment information
   * @returns created assessment
   */
  @Post('')
  @ApiConflictResponse({
    description: 'Assessment with this name and type already exists',
  })
  @ApiNotFoundResponse({
    description: 'Team not found',
  })
  @ApiBadRequestResponse({
    description: 'No active templates found',
  })
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.create(createAssessmentDto);
  }

  /**
   * [GET] /assessment - get all assessments
   * @returns AssessmentDto List of all assessments
   */
  @Get()
  @ApiResponse({
    description: 'Found assessments',
    type: AssessmentDto,
    isArray: true,
  })
  @Roles(Role.ADMIN)
  findAll() {
    return this.assessmentService.findAll();
  }

  /**
   * [GET] /assessment/my - get my assessments
   * @param user User
   * @returns AssessmentDto[] List of all assessments
   */
  @Get('my')
  @ApiResponse({
    description: 'Found assessment of USER',
    type: AssessmentDto,
    isArray: true,
  })
  findUserAssessments(@AuthUser() user: User) {
    return this.assessmentService.findUserAssessments(user);
  }

  /**
   * [GET] /assessment/:id - get assessment by id
   * @param id assessment_id
   * @returns Assessment object
   */
  @Get(':assessment_id')
  @ApiResponse({ description: 'Assessment', type: AssessmentDto })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  async findOne(
    @Param('assessment_id', ParseIntPipe) id: number,
    @AuthUser() user: User
  ) {
    const assessment = await this.assessmentService.userInAssessment(id, user);

    if (!assessment) {
      throw new ForbiddenException();
    }

    return this.assessmentService.findOne(id);
  }

  /**
   * [PATCH] /assessment/:id - update assessment by id
   * @param id assessment_id
   * @param updateAssessmentDto updated assessment information
   * @returns
   */
  @Patch(':assessment_id')
  @ApiResponse({ description: 'Assessment', type: AssessmentDto })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  @ApiConflictResponse({
    description: 'Assessment with this name and type already exists',
  })
  async update(
    @Param('assessment_id', ParseIntPipe) id: number,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
    @AuthUser() user: User
  ) {
    const assessment = await this.assessmentService.userInAssessment(id, user);

    if (!assessment) {
      throw new ForbiddenException();
    }

    return this.assessmentService.update(id, updateAssessmentDto);
  }

  /**
   * [DELETE] /assessment/:id - delete assessment by id
   * @param id assessment_id
   * @returns deleted Assessment object
   */
  @Delete(':assessment_id')
  @ApiResponse({ description: 'Assessment', type: AssessmentDto })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  async delete(
    @Param('assessment_id', ParseIntPipe) id: number,
    @AuthUser() user: User
  ) {
    const assessment = await this.assessmentService.userInAssessment(id, user);

    if (!assessment) {
      throw new ForbiddenException();
    }

    return this.assessmentService.delete(id);
  }

  /**
   * [POST] /assessment/:id/complete - mark assessment as complete
   * @param id assessment_id
   * @returns updated Assessment object
   */
  @Post(':assessment_id/complete')
  @ApiResponse({ description: 'Assessment', type: AssessmentDto })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  async complete(
    @Param('assessment_id', ParseIntPipe) id: number,
    @AuthUser() user: User
  ) {
    const assessment = await this.assessmentService.userInAssessment(id, user);

    if (!assessment) {
      throw new ForbiddenException();
    }

    return this.assessmentService.complete(id);
  }

  /**
   * [POST] /assessment/:id/save - save checkpoint
   * @param assessment_id assessment_id
   * @param saveCheckpointDto save checkpoint information
   * @returns Checkpoint saved
   */
  @Post(':assessment_id/save')
  @ApiOkResponse({ description: 'Checkpoint saved' })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  async saveCheckpointAnswer(
    @Param('assessment_id', ParseIntPipe) assessment_id: number,
    @Body() saveCheckpointDto: SaveCheckpointDto,
    @AuthUser() user: User
  ) {
    // Check if user in assessment
    const assessment = await this.assessmentService.userInAssessment(
      assessment_id,
      user
    );

    if (!assessment) {
      throw new ForbiddenException();
    }

    return this.checkpointService.saveCheckpoint(assessment, saveCheckpointDto);
  }

  /**
   * [GET] /assessment/:id/save - get saved checkpoints
   * @param assessment_id assessment_id
   * @returns Saved checkpoints
   */
  @Get(':assessment_id/save')
  @ApiResponse({
    description: 'Saved checkpoints',
    type: SaveCheckpointDto,
    isArray: true,
  })
  async getSavedCheckpoints(
    @Param('assessment_id', ParseIntPipe) assessment_id: number,
    @AuthUser() user: User
  ) {
    // Check if user in assessment
    const assessment = await this.assessmentService.userInAssessment(
      assessment_id,
      user
    );

    if (!assessment) {
      throw new ForbiddenException();
    }

    return this.checkpointService.getSavedCheckpoints(assessment);
  }

  /**
   * [POST] /assessment/:id/feedback - Add feedback to assessment
   * @param id assessment_id
   * @returns updated Assessment object
   */
  @Post(':assessment_id/feedback')
  @Roles(Role.ASSESSOR)
  @ApiResponse({ description: 'Assessment', type: AssessmentDto })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  feedback(
    @Param('assessment_id', ParseIntPipe) id: number,
    @Body() feedbackDto: FeedbackDto
  ) {
    return this.assessmentService.feedback(id, feedbackDto);
  }
}
