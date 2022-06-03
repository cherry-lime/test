import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create team object using given team name
   * @param name name of team
   * @returns created team
   */
  // async create(createTeamDto: CreateTeamDto): Promise<Team> {
  //   return await this.prisma.team.create({
  //     data: createTeamDto,
  //   });
  // }

  findAll() {
    return `This action returns all teams`;
  }

  /**
   * Get team object by name
   * @param name name of team
   * @returns team object corresponding to team_name, null if not found
   * @throws Team not found
   */
  async findOne(name: string): Promise<Team> {
    // Get team by team_name from prisma
    const team = await this.prisma.team.findFirst({
      where: {
        team_name: name,
      },
    });

    // Throw error if team not found
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Return team
    return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
