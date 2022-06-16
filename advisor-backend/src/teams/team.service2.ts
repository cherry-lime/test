import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { InviteTokenDto } from './dto/invite-token.dto';

@Injectable()
export class TeamsService2 {
  constructor(private prisma: PrismaService) {}

  /**
   * Get team objects of the user issuing the request
   * @param user_id user_id of user issuing the request
   * @returns teams objects of the user issuing the request
   * @throws User is not associated to any teams
   * @throws Team with given team id not found
   */
  async getTeams(user_id: number): Promise<Team[]> {
    // Get team ids of user from prisma
    const teamIds = await this.prisma.userInTeam
      .findMany({
        where: {
          user_id: user_id,
        },
        select: {
          team_id: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!teamIds) {
      // Throw error if user with given user id not found
      throw new NotFoundException('User is not associated to any teams');
    }

    // Get team objects of user from prisma
    const teams = await this.prisma.team
      .findMany({
        where: {
          team_id: {
            in: teamIds.map((a) => a.team_id),
          },
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!teams) {
      // Throw error if team with given team id not found
      throw new NotFoundException('Team with given team id not found');
    }

    return teams;
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
   * Get invite_token of team given a team id
   * @param id id of team
   * @returns inviteTokenDto object corresponding to team_id
   * @throws Team not found
   */
  async getInviteToken(id: number): Promise<InviteTokenDto> {
    // Get team id and associated user ids from team with team_id from prisma
    const invite_token = await this.prisma.team
      .findUnique({
        where: {
          team_id: id,
        },
        select: {
          invite_token: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!invite_token) {
      // Throw error if team with given team id not found
      throw new NotFoundException('Team with given team id not found');
    }

    return {
      invite_token: invite_token.invite_token,
    } as InviteTokenDto;
  }
}
