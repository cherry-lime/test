import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsService2 } from './team.service2';
import { CreateTeamDto } from './dto/create-team.dto';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Team } from './dto/team.dto';
import { TeamMembers } from './dto/team-member.dto';
import { InviteTokenDto } from './dto/invite-token.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AssessmentDto } from '../assessment/dto/assessment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role, User } from '@prisma/client';
import AuthUser from '../common/decorators/auth-user.decorator';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly teamsService2: TeamsService2
  ) {}

  /**
   * [GET] /teams/my-teams - get the teams of the user issuing the request
   * @returns array of team object
   * @throws {NotFoundException} if user is not in any team
   * @throws {NotFoundException} team with given team id not found
   * @throws {InternalServerErrorException} internal server error
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/my-teams/')
  @ApiResponse({ description: 'Get ', type: Team })
  @ApiNotFoundResponse({ description: 'user is not in any team' })
  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  getTeams(@AuthUser() user: User): Promise<Team[]> {
    return this.teamsService2.getTeams(user.user_id);
  }

  /**
   * [GET] /teams/:team_id/isUserInTeam - check whether user
   *                       issuing the request is in the team
   * @param team_id team_id
   * @param user_id user_id
   * @returns true if user is in team, false otherwise
   * @throws {NotFoundException} if team_id is not found
   * @throws {InternalServerErrorException} if error occurs
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/:team_id/isUserInTeam')
  @ApiResponse({ description: 'Check if user is in team', type: Boolean })
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  checkIfUserIsInTeam(
    @AuthUser() user: User,
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<boolean> {
    return this.teamsService.isUserInTeam(user.user_id, team_id);
  }

  /**
   * [POST] /team/create - Create team given a createTeamDto
   * Allowed roles: ADMIN, ASSESSOR
   * @param createTeamDto CreateTeamDto
   * @returns Team object
   */
  @Post('create')
  @ApiResponse({
    description: 'Create team with given team name',
    type: Team,
  })
  @ApiConflictResponse({ description: 'Team name already exists' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.ASSESSOR)
  create(
    @AuthUser() user: User,
    @Body() createTeamDto: CreateTeamDto
  ): Promise<Team> {
    return this.teamsService.create(user.user_id, createTeamDto);
  }

  /**
   * [GET] /team/:team_id - Get team by team id
   * @param team_id team_id
   * @returns Team object
   */
  @Get(':team_id')
  @ApiResponse({
    description: 'Find team by team id',
    type: Team,
  })
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('team_id', ParseIntPipe) team_id: number): Promise<Team> {
    return this.teamsService2.findOne(team_id);
  }

  /**
   * [GET] /team/:team_id/members - Get members of a team given a team id
   * Permission: ADMIN, ASSESSOR (if is part of the team),
   *             USER (if is part of the team)
   * @param team_id team_id
   * @returns Team members object
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':team_id/members')
  @ApiResponse({
    description: 'Get members of a team given a team id',
    type: TeamMembers,
  })
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiNotFoundResponse({ description: 'No members are associated to the team' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findTeamMembers(
    @AuthUser() user: User,
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<TeamMembers> {
    return this.teamsService.findTeamMembers(user, team_id);
  }

  /**
   * [PATCH] /team/join/:invite_token - Join team via invite_token
   * @param invite_token invite_token
   * @returns Udated team members object
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('join/:invite_token')
  @ApiResponse({
    description: 'Join team via invite_token',
    type: TeamMembers,
  })
  @ApiNotFoundResponse({
    description: 'Team with given invite_token not found',
  })
  @ApiNotFoundResponse({ description: 'No members are associated to the team' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  addTeamMember(
    @AuthUser() user: User,
    @Param('invite_token', ParseUUIDPipe) invite_token: string
  ): Promise<TeamMembers> {
    return this.teamsService.addTeamMember(user, invite_token);
  }

  /**
   * [GET] /team/:team_id/invite_token - Get invite token for a team
   * @param team_id team_id
   * @returns invite_token
   * @throws Team not found
   */
  @Get(':team_id/invite_token')
  @ApiResponse({
    description: 'Get invite token of a team',
    type: String,
  })
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getInviteToken(
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<InviteTokenDto> {
    return this.teamsService2.getInviteToken(team_id);
  }

  /**
   * [GET] /team/:team_id/assessments - Get assessments of a team given a team id
   * @param id team_id
   * @returns assessments
   * @throws Team not found
   */
  @Get(':team_id/assessments')
  @ApiResponse({
    description: 'Get assessments of a team given a team id',
    type: AssessmentDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getTeamAssessments(
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<AssessmentDto[]> {
    return this.teamsService.getAssessments(team_id);
  }

  /**
   * [PATCH] /team/:team_id - Update team given a team_id and an updateTeamDto
   * Allowed roles: ADMIN, ASSESSOR
   * @param team_id team_id
   * @param updateTeamDto UpdateTeamDto
   * @returns an updated team object
   * @throws Team not found
   * @throws Team name already exists
   * @throws Internal server error
   */
  @Patch(':team_id')
  @ApiResponse({
    description: 'Update team given a team_id and an updateTeamDto',
    type: Team,
  })
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiConflictResponse({ description: 'Team name already exists' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.ASSESSOR)
  updateTeam(
    @Param('team_id', ParseIntPipe) team_id: number,
    @Body() updateTeamDto: UpdateTeamDto
  ): Promise<Team> {
    return this.teamsService.updateTeam(team_id, updateTeamDto);
  }

  /**
   * [DELETE] /team/:team_id - Delete team given a team_id
   * Allowed roles: ADMIN, ASSESSOR (if is part of the team)
   * @param team_id team_id
   * @returns the deleted team object
   * @throws Team not found
   * @throws Internal server error
   * @throws assessor is not part of the team
   */
  @Delete(':team_id')
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiResponse({
    description: 'Delete team given a team_id',
    type: Team,
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.ASSESSOR)
  deleteTeam(
    @AuthUser() user: User,
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<Team> {
    return this.teamsService.deleteTeam(user, team_id);
  }
}
