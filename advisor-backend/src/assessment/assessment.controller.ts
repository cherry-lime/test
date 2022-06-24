import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { AssessmentDto } from './dto/assessment.dto';
import { FeedbackDto } from './dto/feedback.dto';
import { SaveCheckpointDto } from './dto/save-checkpoint.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { ScoreDto } from './dto/score.dto';
import { ScorePerTopicDto } from './dto/score-per-topic.dto';
import { AssessmentScoreService } from './assessment-score.service';
import { Role, User } from '@prisma/client';
import AuthUser from '../common/decorators/auth-user.decorator';
import { CheckpointService } from '../checkpoint/checkpoint.service';
import { RecommendationDto } from '../feedback/dto/recommendation.dto';
import { FeedbackService } from '../feedback/feedback.service';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly assessmentScoreService: AssessmentScoreService,
    private readonly checkpointService: CheckpointService,
    private readonly feedbackService: FeedbackService
  ) {}

  /**
   * [POST] /assessment - create new assessment
   * @param createAssessmentDto Assessment information
   * @returns created assessment
   */
  @Post()
  @ApiConflictResponse({
    description: 'Assessment with this name and type already exists',
  })
  @ApiNotFoundResponse({
    description: 'Team not found',
  })
  @ApiBadRequestResponse({
    description: 'No active templates found',
  })
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createAssessmentDto: CreateAssessmentDto,
    @AuthUser() user: User
  ) {
    return this.assessmentService.create(createAssessmentDto, user);
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
  findAll() {
    return this.assessmentService.findAll();
  }

  /**
   * [GET] /assessment/my - get my assessments
   * @param user User
   * @returns AssessmentDto[] List of all assessments
   */
  @Get('my')
  @UseGuards(AuthGuard('jwt'))
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
  findOne(@Param('assessment_id', ParseIntPipe) id: number) {
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
  update(
    @Param('assessment_id', ParseIntPipe) id: number,
    @Body() updateAssessmentDto: UpdateAssessmentDto
  ) {
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
  delete(@Param('assessment_id', ParseIntPipe) id: number) {
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
  complete(@Param('assessment_id', ParseIntPipe) id: number) {
    return this.assessmentService.complete(id);
  }

  /**
   * [POST] /assessment/:id/save - save checkpoint
   * @param assessment_id assessment_id
   * @param saveCheckpointDto save checkpoint information
   * @returns Checkpoint saved
   */
  @Post(':assessment_id/save')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ASSESSOR)
  @ApiResponse({ description: 'Assessment', type: AssessmentDto })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  feedback(
    @Param('assessment_id', ParseIntPipe) id: number,
    @Body() feedbackDto: FeedbackDto
  ) {
    return this.assessmentService.feedback(id, feedbackDto);
  }

  /**
   * [GET] /assessment/{assessment_id}/score - get score for all topics
   * @param assessment_id assessment_id
   * @returns scoreDto
   * @throws NotFoundException if assessment not found
   * @throws ForbiddenException if assessment type is INDIVIDUAL
   * @throws BadRequestException if assessment is not completed
   * @throws BadRequestException if no enabled maturities found associated to this template
   * @throws BadRequestException if no enabled categories found associated to this template
   * @throws BadRequestException if topic not found or not enabled for this template
   * @throws BadRequestException if no enabled checkpoints found associated to this template
   * @throws BadRequestException if no enabled possible answers found associated to this template
   */
  @Get(':assessment_id/score')
  @ApiResponse({
    description: 'Score for all topics',
    type: ScoreDto,
  })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  @ApiBadRequestResponse({
    description: 'Individual assessment cannot be scored',
  })
  @ApiInternalServerErrorResponse()
  async getScore(
    @Param('assessment_id', ParseIntPipe) id: number
  ): Promise<ScoreDto> {
    return {
      scores: await this.assessmentScoreService.getScore(id, null),
    } as ScoreDto;
  }

  /**
   * [GET] /assessment/{assessment_id}/score/{topic_id} -
   *                                            get score per specific topic
   * @param assessment_id assessment_id
   * @param topic_id topic_id
   * @returns scorePerTopicDto
   * @throws NotFoundException if assessment not found
   * @throws ForbiddenException if assessment type is INDIVIDUAL
   * @throws BadRequestException if assessment is not completed
   * @throws BadRequestException if no enabled maturities found associated to this template
   * @throws BadRequestException if no enabled categories found associated to this template
   * @throws BadRequestException if topic not found or not enabled for this template
   * @throws BadRequestException if no enabled checkpoints found associated to this template
   * @throws BadRequestException if no enabled possible answers found associated to this template
   */
  @Get(':assessment_id/score/:topic_id')
  @ApiResponse({
    description: 'Score for a specific topics',
    type: ScorePerTopicDto,
  })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  @ApiBadRequestResponse({
    description: 'Individual assessment cannot be scored',
  })
  @ApiInternalServerErrorResponse()
  async getScorePerTopic(
    @Param('assessment_id', ParseIntPipe) id: number,
    @Param('topic_id', ParseIntPipe) topicId: number
  ): Promise<ScorePerTopicDto> {
    return {
      topic_id: topicId,
      scores: await this.assessmentScoreService.getScore(id, topicId),
    } as ScorePerTopicDto;
  }

  @Get(':assessment_id/feedback')
  @ApiTags('feedback')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    description: 'Recommendations',
    type: RecommendationDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Assessment not found' })
  @ApiQuery({
    name: 'topic_id',
    required: false,
    type: Number,
  })
  async getRecommendations(
    @Param('assessment_id', ParseIntPipe) assessment_id: number,
    @AuthUser() user: User,
    @Query('topic_id') topic_id?: number
  ) {
    // Check if user in assessment
    const assessment = await this.assessmentService.userInAssessment(
      assessment_id,
      user
    );

    if (!assessment) {
      throw new NotFoundException('Assessment not found');
    }

    return this.feedbackService.getRecommendations(assessment, topic_id);
  }
}
