import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
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
import { Roles } from '../common/decorators/roles.decorator';
import { Role, User } from '@prisma/client';
import AuthUser from '../common/decorators/auth-user.decorator';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /**
   * [GET] /teams/my-teams - get the teams of the user issuing the request
   * @returns array of team object
   * @throws {NotFoundException} if user is not in any team
   * @throws {NotFoundException} team with given team id not found
   * @throws {InternalServerErrorException} internal server error
   */
  @Get('/my-teams/')
  @ApiResponse({ description: 'Get ', type: Team })
  @ApiNotFoundResponse({ description: 'user is not in any team' })
  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  getTeams(@AuthUser() user: User): Promise<Team[]> {
    return this.teamsService.getTeams(user.user_id);
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
    return this.teamsService.findOne(team_id);
  }

  /**
   * [GET] /team/:team_id/members - Get members of a team given a team id
   * Permission: ADMIN, ASSESSOR (if is part of the team),
   *             USER (if is part of the team)
   * @param team_id team_id
   * @returns Team members object
   */
  @Get(':team_id/members')
  @ApiResponse({
    description: 'Get members of a team given a team id',
    type: TeamMembers,
  })
  @ApiNotFoundResponse({ description: 'Team with given team id not found' })
  @ApiNotFoundResponse({ description: 'No members are associated to the team' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findTeamMembers(
    @AuthUser() user: User,
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<TeamMembers> {
    const isUserInTeam = await this.teamsService
      .isUserInTeam(user.user_id, team_id)
      .catch((error) => {
        if (error instanceof NotFoundException) {
          // Throw error if team with given team id not found
          throw new NotFoundException('Team with given team id not found');
        } else {
          // Throw error if internal server error
          throw new InternalServerErrorException();
        }
      });
    if (!isUserInTeam && user.role !== 'ADMIN') {
      // Throw error if user is not in team
      throw new ForbiddenException('You are not part of this team');
    }

    return this.teamsService.findTeamMembers(team_id);
  }

  /**
   * [PATCH] /team/join/:invite_token - Join team via invite_token
   * @param invite_token invite_token
   * @returns Udated team members object
   */
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
    return this.teamsService.getInviteToken(team_id);
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
  @Roles(Role.ADMIN, Role.ASSESSOR)
  async deleteTeam(
    @AuthUser() user: User,
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<Team> {
    const isUserInTeam = await this.teamsService
      .isUserInTeam(user.user_id, team_id)
      .catch((error) => {
        if (error instanceof NotFoundException) {
          // Throw error if team with given team id not found
          throw new NotFoundException('Team with given team id not found');
        } else {
          // Throw error if internal server error
          throw new InternalServerErrorException();
        }
      });
    if (!isUserInTeam && user.role !== 'ADMIN') {
      // Throw error if user is not in team
      throw new ForbiddenException('You are not part of this team');
    }

    return this.teamsService.deleteTeam(team_id);
  }
}