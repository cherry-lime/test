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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Team } from './dto/team.dto';
import { TeamMembers } from './dto/team-member.dto';
import { AssessmentResponse } from '../assessment/responses/AssessmentResponse';
import { InviteTokenDto } from './dto/invite-token.dto';

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
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  /**
   * [GET] /team/:id - Get team by team id
   * @param id team_id
   * @returns Team object
   */
  @Get(':id')
  @ApiResponse({
    description: 'Find team by team id',
    type: Team,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  /**
   * [GET] /team/:id/members - Get members of a team given a team id
   * @param id team_id
   * @returns Team members object
   */
  @Get(':id/members')
  @ApiResponse({
    description: 'Get members of a team given a team id',
    type: TeamMembers,
  })
  findTeamMembers(@Param('id', ParseIntPipe) id: number): Promise<TeamMembers> {
    return this.teamsService.findTeamMembers(id);
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
  addTeamMember(
    @Param('invite_token', ParseUUIDPipe) invite_token: string
  ): Promise<TeamMembers> {
    return this.teamsService.addTeamMember(invite_token);
  }

  /**
   * [GET] /team/:id/invite - Get invite token for a team
   * @param id team_id
   * @returns invite_token
   * @throws Team not found
   */
  @Get(':id/invite')
  @ApiResponse({
    description: 'Get invite token of a team',
    type: String,
  })
  getInviteToken(
    @Param('id', ParseIntPipe) id: number
  ): Promise<InviteTokenDto> {
    return this.teamsService.getInviteToken(id);
  }

  /**
   * [GET] /team/:id/assessments - Get assessments of a team given a team id
   * @param id team_id
   * @returns assessments
   * @throws Team not found
   */
  @Get(':id/assessments')
  @ApiResponse({
    description: 'Get assessments of a team given a team id',
    type: AssessmentResponse,
    isArray: true,
  })
  getTeamAssessments(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AssessmentResponse[]> {
    return this.teamsService.getAssessments(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
  //   return this.teamsService.update(+id, updateTeamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamsService.remove(+id);
  // }
}
