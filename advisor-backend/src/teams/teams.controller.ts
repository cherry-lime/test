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

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /**
   * [POST] /team - Get team by team name
   * @param name team_name
   * @returns Team object
   */
  // @Post('')
  // @ApiResponse({
  //   description: 'Create team with given team name',
  //   type: Team,
  // })
  // create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
  //   return this.teamsService.create(createTeamDto);
  // }

  // @Get()
  // findAll() {
  //   return this.teamsService.findAll();
  // }

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
  //   return this.teamsService.update(+id, updateTeamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamsService.remove(+id);
  // }
}
