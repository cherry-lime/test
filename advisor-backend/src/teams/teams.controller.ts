import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
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

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /**
   * [POST] /team/create - Create team given a createTeamDto
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
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
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
  findTeamMembers(
    @Param('team_id', ParseIntPipe) team_id: number
  ): Promise<TeamMembers> {
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
    @Param('invite_token', ParseUUIDPipe) invite_token: string
  ): Promise<TeamMembers> {
    return this.teamsService.addTeamMember(invite_token);
  }

  /**
   * [GET] /team/:team_id/invite - Get invite token for a team
   * @param team_id team_id
   * @returns invite_token
   * @throws Team not found
   */
  @Get(':team_id/invite')
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
  updateTeam(
    @Param('team_id', ParseIntPipe) team_id: number,
    @Body() updateTeamDto: UpdateTeamDto
  ): Promise<Team> {
    return this.teamsService.updateTeam(team_id, updateTeamDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamsService.remove(+id);
  // }
}
