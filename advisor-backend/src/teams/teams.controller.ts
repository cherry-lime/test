import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Team } from './entities/team.entity';
import { TeamMembers } from './entities/team.members.entity';
import { AssessmentResponse } from '../../src/assessment/responses/AssessmentResponse';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /**
   * [POST] /team/create - Get team by team name
   * @param name team_name
   * @returns Team object
   */
  @Post('create')
  @ApiResponse({
    description: 'Create team with given team name',
    type: Team,
  })
  create(@Body() name: string): Promise<Team> {
    return this.teamsService.create(name);
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
  findOne(@Param('id') id: number): Promise<Team> {
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
  findTeamMembers(@Param('id') id: number): Promise<TeamMembers> {
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
    @Param('invite_token') invite_token: string
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
  getInviteToken(@Param('id') id: number): Promise<string> {
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
  getTeamAssessments(@Param('id') id: number): Promise<AssessmentResponse[]> {
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
