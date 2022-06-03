import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {
    return `This action returns all teams`;
  }

  /**
   * Get team object by name
   * @param name name of team
   * @returns team object corresponding to team_id, null if not found
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
