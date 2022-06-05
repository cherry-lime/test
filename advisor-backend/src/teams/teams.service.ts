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

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create team object using given team name
   * @param name name of team
   * @returns created team
   */
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    return await this.prisma.team
      .create({
        data: createTeamDto,
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
   * Get team object by name
   * @param name name of team
   * @returns team object corresponding to team_name, null if not found
   * @throws Team not found
   */
  async findOne(name: string): Promise<Team> {
    // Get team by team_name from prisma
    const team = await this.prisma.team
      .findUnique({
        where: {
          team_name: name,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!team) {
      // Throw error if team with given team name not found
      throw new NotFoundException('Team with given team name not found');
    }

    // Return team
    return team;
  }

  /**
   * Get team members object given a team name
   * @param name name of team
   * @returns team members object corresponding to team_name, null if not found
   * @throws Team not found
   */
  async findTeamMembers(name: string): Promise<TeamMembers> {
    // Response stored in teamMembers
    const teamMembers = new TeamMembers();
    teamMembers.team_name = name;

    // Get team id and associated user ids from team with team_name from prisma
    const temp = await this.prisma.team
      .findUnique({
        where: {
          team_name: name,
        },
        select: {
          team_id: true,
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
      // Throw error if team with given team name not found
      throw new NotFoundException('Team with given team name not found');
    }

    teamMembers.team_id = temp.team_id;
    teamMembers.team_member_ids = temp.UserInTeam.map((a) => a.user_id);

    // Get team member usernames from team with team_name from prisma
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
   * Add team member to team
   * @param name name of team
   * @returns team members object corresponding to team_name, null if not found
   * @throws Team not found
   */
  async addTeamMember(invite_token: string): Promise<TeamMembers> {
    // Response stored in teamMembers
    const teamMembers = new TeamMembers();

    // Get team id, team name and associated user ids from team with team_name from prisma
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
      // Throw error if team with given team name not found
      throw new NotFoundException('Team with given team name not found');
    }

    teamMembers.team_id = temp.team_id;
    teamMembers.team_name = temp.team_name;
    let teamMemberIds = temp.UserInTeam.map((a) => a.user_id);
    //get user/assessor being added to team and add to teamMemberIds
    const user_id = 1; // TODO
    teamMemberIds = [...teamMemberIds, user_id];
    teamMemberIds.sort((a, b) => a - b); // Sort ascending order
    teamMembers.team_member_ids = teamMemberIds;

    // Get team member usernames from team with team_name from prisma
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

  // TODO findtokenofteam
  // TODO get team assessments
  // TODO get all teams of user

  // update(id: number, updateTeamDto: UpdateTeamDto) {
  //   return `This action updates a #${id} team`;
  // }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
