import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from './dto/team.dto';
import { TeamMembers } from './dto/team-member.dto';
import { InviteTokenDto } from './dto/invite-token.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AssessmentDto } from '../assessment/dto/assessment.dto';
import { User } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Check whether user is in team given a user id and a unique team identifier
   * @param id id of the user
   * @param team_id id of the team
   * @returns true if user is in team, false otherwise
   * @throws Team with given team id not found
   */
  async isUserInTeam(id: number, team_id: number): Promise<boolean> {
    // Get team id and associated user ids from team with team_id from prisma
    const team = await this.prisma.team
      .findUnique({
        where: {
          team_id,
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

    if (!team) {
      // Throw error if team with given team id not found
      throw new NotFoundException('Team with given team id not found');
    }

    // Return true if user is in team, false otherwise
    return team.UserInTeam.some((a) => a.user_id === id);
  }

  /**
   * Create team object given a createTeamDto
   * @param createTeamDto CreateTeamDto
   * @returns created team
   * @throws Team name already exists
   */
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    return await this.prisma.team
      .create({
        data: {
          team_name: createTeamDto.team_name,
          team_country: createTeamDto.team_country,
          team_department: createTeamDto.team_department,
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
   * Get team members object given a team id
   * @param id id of team
   * @param user user that is issuing the request
   * @returns team members object corresponding to team_id
   * @throws Team not found
   */
  async findTeamMembers(user: User, id: number): Promise<TeamMembers> {
    const isUserInTeam = await this.isUserInTeam(user.user_id, id).catch(
      (error) => {
        if (error instanceof NotFoundException) {
          // Throw error if team with given team id not found
          throw new NotFoundException('Team with given team id not found');
        } else {
          // Throw error if internal server error
          throw new InternalServerErrorException();
        }
      }
    );
    if (!isUserInTeam && user.role !== 'ADMIN') {
      // Throw error if user is not in team
      throw new ForbiddenException('You are not part of this team');
    }

    // Response stored in teamMembers
    const teamMembers = new TeamMembers();

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
    const teamMemberIds = temp.UserInTeam.map((a) => a.user_id);

    if (teamMemberIds.length === 0) {
      // Throw error if no members are associated to the team
      throw new NotFoundException('No members are associated to the team');
    }

    // Get team member usernames from team with team_member_ids from prisma
    const teamMemberUsernames = await this.prisma.user
      .findMany({
        where: {
          user_id: {
            in: teamMemberIds,
          },
        },
        select: {
          username: true,
          role: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    teamMembers.team_members = teamMemberUsernames;

    // Return team
    return teamMembers;
  }

  /**
   * Add team member to team with invite_token
   * @param invite_token invite token
   * @param user user that is issuing the request
   * @returns team members object corresponding, given invite_token
   * @throws Team not found
   */
  async addTeamMember(user: User, invite_token: string): Promise<TeamMembers> {
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

    teamMembers.team_name = temp.team_name;
    let teamMemberIds = temp.UserInTeam.map((a) => a.user_id);
    //get user/assessor being added to team and add to teamMemberIds
    teamMemberIds = [...teamMemberIds, user.user_id];
    teamMemberIds.sort((a, b) => a - b); // Sort ascending order

    // Get team member usernames from team with team_member_ids from prisma
    const teamMemberUsernames = await this.prisma.user
      .findMany({
        where: {
          user_id: {
            in: teamMemberIds,
          },
        },
        select: {
          username: true,
          role: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (teamMemberUsernames.length === 0) {
      // Throw error if no members are associated to the member ids
      throw new NotFoundException('No members are associated to the ids');
    }

    teamMembers.team_members = teamMemberUsernames;
    teamMembers.team_members.push({ username: user.username, role: user.role });

    await this.prisma.userInTeam
      .create({
        data: {
          user_id: user.user_id,
          team_id: temp.team_id,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return teamMembers;
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

  /**
   * Get assessments of a team given a team id
   * @param id id of team
   * @returns assessment objects corresponding to team_id
   * @throws Team not found
   */
  async getAssessments(id: number): Promise<AssessmentDto[]> {
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

  /**
   * Update team given a team id and UpdateTeamDto
   * @param id id of team
   * @param updateTeamDto UpdateTeamDto
   * @returns updated team object
   * @throws Team not found
   * @throws Team name already exists
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
        } else if (error.code === 'P2002') {
          throw new ConflictException('Team name already exists');
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
  async deleteTeam(user: User, id: number): Promise<Team> {
    const isUserInTeam = await this.isUserInTeam(user.user_id, id).catch(
      (error) => {
        if (error instanceof NotFoundException) {
          // Throw error if team with given team id not found
          throw new NotFoundException('Team with given team id not found');
        } else {
          // Throw error if internal server error
          throw new InternalServerErrorException();
        }
      }
    );
    if (!isUserInTeam && user.role !== 'ADMIN') {
      // Throw error if user is not in team
      throw new ForbiddenException('You are not part of this team');
    }

    await this.prisma.userInTeam
      .deleteMany({
        where: {
          team_id: id,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException('Team with given team id not found');
        } else {
          // Throw error if internal server error
          throw new InternalServerErrorException();
        }
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
