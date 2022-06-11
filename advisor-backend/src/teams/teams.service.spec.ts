import { Test } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import {
  aTeam,
  aTeamNoMembers,
  aTeamWithAssessment,
  mockCreateTeamBody,
  aUpdateTeam,
} from '../prisma/mock/mockTeam';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { PrismaService } from '../prisma/prisma.service';
import { aAssessment } from '../prisma/mock/mockAssessment';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { aUser1 } from '../prisma/mock/mockUser';
import { InviteTokenDto } from './dto/invite-token.dto';

const moduleMocker = new ModuleMocker(global);

describe('TeamsService', () => {
  let teamsService: TeamsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TeamsService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return mockPrisma;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    teamsService = moduleRef.get<TeamsService>(TeamsService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(teamsService).toBeDefined();
  });

  describe('createTeam', () => {
    it('Should return the created team', async () => {
      expect(teamsService.create(mockCreateTeamBody)).resolves.toBe(aTeam);
    });

    it('Should reject if team name already exists', async () => {
      jest
        .spyOn(prisma.team, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });
      await expect(
        teamsService.create(mockCreateTeamBody)
      ).rejects.toThrowError(ConflictException);
    });

    it('Should reject with unkown error', async () => {
      jest.spyOn(prisma.team, 'create').mockRejectedValueOnce({ code: 'TEST' });
      await expect(
        teamsService.create(mockCreateTeamBody)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('getTeam', () => {
    it('Should return the team', async () => {
      expect(teamsService.findOne(1)).resolves.toBe(aTeam);
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.team, 'findUnique').mockResolvedValueOnce(null);
      expect(teamsService.findOne(2)).rejects.toThrowError(NotFoundException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.team, 'findUnique')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.findOne(1)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('getTeamMembers', () => {
    it('Should return the team members', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValueOnce([aUser1]);
      expect(teamsService.findTeamMembers(1)).resolves.toHaveProperty(
        'team_members[0].username',
        'test_username'
      );
    });

    it('Should return the team members', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValueOnce([aUser1]);
      expect(teamsService.findTeamMembers(1)).resolves.toHaveProperty(
        'team_members[0].role',
        'USER'
      );
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.team, 'findUnique').mockResolvedValueOnce(null);
      expect(teamsService.findTeamMembers(2)).rejects.toThrow(
        NotFoundException
      );
    });

    it('Should reject if no members are associated with the team', async () => {
      jest
        .spyOn(prisma.team, 'findUnique')
        .mockResolvedValueOnce(aTeamNoMembers);
      expect(teamsService.findTeamMembers(1)).rejects.toThrow(
        NotFoundException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.team, 'findUnique')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.findTeamMembers(1)).rejects.toThrow(
        InternalServerErrorException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.user, 'findMany')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.findTeamMembers(1)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('addTeamMember', () => {
    it('Should return the team members', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValueOnce([aUser1]);
      expect(
        teamsService.addTeamMember('test_invite_token')
      ).resolves.toHaveProperty('team_members[0].username', 'test_username');
    });

    it('Should return the team members', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValueOnce([aUser1]);
      expect(
        teamsService.addTeamMember('test_invite_token')
      ).resolves.toHaveProperty('team_members[0].role', 'USER');
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.team, 'findUnique').mockResolvedValueOnce(null);
      expect(teamsService.addTeamMember('invalid_token')).rejects.toThrow(
        NotFoundException
      );
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValueOnce([]);
      expect(teamsService.addTeamMember('invalid_token')).rejects.toThrow(
        NotFoundException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.team, 'findUnique')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.addTeamMember('test')).rejects.toThrow(
        InternalServerErrorException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.user, 'findMany')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.addTeamMember('test')).rejects.toThrow(
        InternalServerErrorException
      );
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.userInTeam, 'create')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.addTeamMember('test')).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('getInviteToken', () => {
    it('Should return the invite token', async () => {
      expect(teamsService.getInviteToken(1)).resolves.toStrictEqual({
        invite_token: 'test_invite_token',
      } as InviteTokenDto);
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.team, 'findUnique').mockResolvedValueOnce(null);
      expect(teamsService.getInviteToken(2)).rejects.toThrow(NotFoundException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.team, 'findUnique')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.getInviteToken(1)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('getTeamAssessments', () => {
    it('Should return the team assessments', async () => {
      jest
        .spyOn(prisma.team, 'findUnique')
        .mockResolvedValueOnce(aTeamWithAssessment);
      expect(teamsService.getAssessments(1)).resolves.toStrictEqual([
        aAssessment,
      ]);
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.team, 'findUnique').mockResolvedValueOnce(null);
      expect(teamsService.getAssessments(2)).rejects.toThrow(NotFoundException);
    });

    it('Should reject with unknown error', async () => {
      jest
        .spyOn(prisma.team, 'findUnique')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.getAssessments(1)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('updateTeam', () => {
    it('Should return the team', async () => {
      jest.spyOn(prisma.team, 'update').mockResolvedValueOnce(aTeam);
      expect(teamsService.updateTeam(1, aUpdateTeam)).resolves.toBe(aTeam);
    });

    it('Should reject if team not found', async () => {
      jest
        .spyOn(prisma.team, 'update')
        .mockRejectedValueOnce({ code: 'P2025' });
      expect(teamsService.updateTeam(2, aUpdateTeam)).rejects.toThrow(
        NotFoundException
      );
    });

    it('Should reject if team name exists', async () => {
      jest
        .spyOn(prisma.team, 'update')
        .mockRejectedValueOnce({ code: 'P2002' });
      expect(teamsService.updateTeam(1, aUpdateTeam)).rejects.toThrow(
        ConflictException
      );
    });

    it('Should reject with unknown error', async () => {
      jest.spyOn(prisma.team, 'update').mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.updateTeam(1, aUpdateTeam)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
