import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsCRUDService {
  constructor(private prisma: PrismaService) {}
  /**
   * Create team with default team_name - "New Team",
   *    team_country - "", team_department - ""
   * @param user_id id of user that is issuing the request
   * @returns created team
   */
  async create(user_id: number): Promise<Team> {
    const team = await this.prisma.team
      .create({
        data: {
          UserInTeam: {
            create: [
              {
                user_id: user_id,
              },
            ],
          },
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return team;
  }

  /**
   * Get team object by team_id
   * @param id team_id
   * @returns team object corresponding to team_id
   * @throws Team not found
   */
  async findOne(id: number): Promise<Team> {
    // Get team by team_id from prisma
    const team = await this.prisma.team
      .findUnique({
        where: {
          team_id: id,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!team) {
      // Throw error if team with given team id not found
      throw new NotFoundException('Team with given team id not found');
    }

    // Return team
    return team;
  }

  /**
   * Update team given a team id and UpdateTeamDto
   * @param id id of team
   * @param updateTeamDto UpdateTeamDto
   * @returns updated team object
   * @throws Team not found
   * @throws InternalServerErrorException
   */
  async updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
    return await this.prisma.team
      .update({
        where: {
          team_id: id,
        },
        data: {
          ...updateTeamDto,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Team with given team id not found');
        } else {
          throw new InternalServerErrorException();
        }
      });
  }

  /**
   * Delete team given a team id
   * @param id id of team
   * @returns deleted team object
   * @throws Team not found
   * @throws InternalServerErrorException
   */
  async deleteTeam(id: number): Promise<Team> {
    await this.prisma.userInTeam.deleteMany({
      where: {
        team_id: id,
      },
    });

    return await this.prisma.team
      .delete({
        where: {
          team_id: id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Team with given team id not found');
        } else {
          console.log(error);
          throw new InternalServerErrorException();
        }
      });
  }
}