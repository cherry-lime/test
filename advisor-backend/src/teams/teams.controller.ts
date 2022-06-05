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
import { AssessmentResponse } from 'src/assessment/responses/AssessmentResponse';

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
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  /**
   * [GET] /team/:name - Get team by team name
   * @param name team_name
   * @returns Team object
   */
  @Get(':name')
  @ApiResponse({
    description: 'Find team by team name',
    type: Team,
  })
  findOne(@Param('name') name: string): Promise<Team> {
    return this.teamsService.findOne(name);
  }

  /**
   * [GET] /team/:name/members - Get members of a team given a team name
   * @param name team_name
   * @returns Team members object
   */
  @Get(':name/members')
  @ApiResponse({
    description: 'Get members of a team given a team name',
    type: TeamMembers,
  })
  findTeamMembers(@Param('name') name: string): Promise<TeamMembers> {
    return this.teamsService.findTeamMembers(name);
  }

  /**
   * [PATCH] /team/join/:invite_token - Join team via invite_token
   * @param name invitie_token
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
   * [GET] /team/:name/invite - Get invite token for a team
   * @param name team_name
   * @returns invite_token
   * @throws Team not found
   */
  @Get(':name/invite')
  @ApiResponse({
    description: 'Get invite token for a team',
    type: String,
  })
  getInviteToken(@Param('name') name: string): Promise<string> {
    return this.teamsService.getInviteToken(name);
  }

  /**
   * [GET] /team/:name/assessments - Get assessments of a team given a team name
   * @param name team_name
   * @returns assessments
   * @throws Team not found
   */
  @Get(':name/assessments')
  @ApiResponse({
    description: 'Get assessments of a team given a team name',
    type: AssessmentResponse[],
  })
  getTeamAssessments(@Param('name') name: string): Promise<AssessmentResponse[]> {
    return this.teamsService.getTeamAssessments(name);
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
