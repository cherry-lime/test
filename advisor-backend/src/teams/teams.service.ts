import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from './entities/team.entity';
import { TeamMembers } from './entities/team.members.entity';
import { AssessmentResponse } from '../../src/assessment/responses/AssessmentResponse';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create team object given a team name
   * @param name
   * @returns created team
   * @throws Team name already exists
   */
  async create(name: string): Promise<Team> {
    return await this.prisma.team
      .create({
        data: {
          team_name: name,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          // Throw error if team name already exsits
          throw new ConflictException('Team name already exists');
        } else {
          throw new InternalServerErrorException();
        }
      });
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
   * Get team members object given a team id
   * @param id id of team
   * @returns team members object corresponding to team_id
   * @throws Team not found
   */
  async findTeamMembers(id: number): Promise<TeamMembers> {
    // Response stored in teamMembers
    const teamMembers = new TeamMembers();
    teamMembers.team_id = id;

    // Get team name and associated user ids from team with team_id from prisma
    const temp = await this.prisma.team
      .findUnique({
        where: {
          team_id: id,
        },
        select: {
          team_name: true,
          UserInTeam: {
            select: {
              user_id: true,
            },
          },
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!temp) {
      // Throw error if team with given team id not found
      throw new NotFoundException('Team with given team id not found');
    }

    teamMembers.team_name = temp.team_name;
    teamMembers.team_member_ids = temp.UserInTeam.map((a) => a.user_id);

    // Get team member usernames from team with team_member_ids from prisma
    const teamMemberUsernames = await this.prisma.user
      .findMany({
        where: {
          user_id: {
            in: teamMembers.team_member_ids,
          },
        },
        select: {
          username: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (teamMemberUsernames.length === 0) {
      // Throw error if no members are associated to the team
      throw new NotFoundException('No members are associated to the team');
    }

    teamMembers.team_members = teamMemberUsernames.map((a) => a.username);

    // Return team
    return teamMembers;
  }

  /**
   * Add team member to team with invite_token
   * @param invite_token invite token
   * @returns team members object corresponding, given invite_token
   * @throws Team not found
   */
  async addTeamMember(invite_token: string): Promise<TeamMembers> {
    // Response stored in teamMembers
    const teamMembers = new TeamMembers();

    // Get team id, team name and associated user ids from team with invite_token from prisma
    const temp = await this.prisma.team
      .findUnique({
        where: {
          invite_token: invite_token,
        },
        select: {
          team_id: true,
          team_name: true,
          UserInTeam: {
            select: {
              user_id: true,
            },
          },
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!temp) {
      // Throw error if team with given invite token not found
      throw new NotFoundException('Team with given invite_token not found');
    }

    teamMembers.team_id = temp.team_id;
    teamMembers.team_name = temp.team_name;
    let teamMemberIds = temp.UserInTeam.map((a) => a.user_id);
    //get user/assessor being added to team and add to teamMemberIds
    const user_id = 1; // TODO
    teamMemberIds = [...teamMemberIds, user_id];
    teamMemberIds.sort((a, b) => a - b); // Sort ascending order
    teamMembers.team_member_ids = teamMemberIds;

    // Get team member usernames from team with team_member_ids from prisma
    const teamMemberUsernames = await this.prisma.user
      .findMany({
        where: {
          user_id: {
            in: teamMembers.team_member_ids,
          },
        },
        select: {
          username: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (teamMemberUsernames.length === 0) {
      // Throw error if no members are associated to the team
      throw new NotFoundException('No members are associated to the team');
    }

    let teamMemberUsernames2 = teamMemberUsernames.map((a) => a.username);
    //get user/assessor being added to team and add to teamMemberUsernames2
    const username = 'username'; // TODO
    teamMemberUsernames2 = [...teamMemberUsernames2, username];
    teamMemberUsernames2.sort(); // Sort ascending order
    teamMembers.team_members = teamMemberUsernames2;

    await this.prisma.userInTeam.create({
      data: {
        user_id: user_id,
        team_id: teamMembers.team_id,
      },
    });

    return teamMembers;
  }

  /**
   * Get invite_token of team given a team id
   * @param id id of team
   * @returns team members object corresponding to team_id
   * @throws Team not found
   */
  async getInviteToken(id: number): Promise<string> {
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

    return invite_token.invite_token;
  }

  /**
   * Get assessments of a team given a team id
   * @param id id of team
   * @returns assessment objects corresponding to team_id
   * @throws Team not found
   */
  async getAssessments(id: number): Promise<AssessmentResponse[]> {
    const assessments = await this.prisma.team
      .findUnique({
        where: {
          team_id: id,
        },
        select: {
          Assessment: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!assessments) {
      // Throw error if team with given team id not found
      throw new NotFoundException('Team with given team id not found');
    }

    return assessments.Assessment;
  }

  // TODO get team assessments
  // TODO get all teams of user
  // TODO permissions for all endpoints

  // update(id: number, updateTeamDto: UpdateTeamDto) {
  //   return `This action updates a #${id} team`;
  // }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
