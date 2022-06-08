import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { aTeam } from '../prisma/mock/mockTeam';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { mockAssessment } from '../../src/prisma/mock/mockAssessment';
import { mockPrisma } from '../../src/prisma/mock/mockPrisma';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { aTeamMembers } from '../../src/prisma/mock/mockTeamMembers';

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
      expect(teamsService.create('test_team_name')).resolves.toBe(aTeam);
    });

    it('Should reject if team name already exists', async () => {
      jest
        .spyOn(prisma.team, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });
      await expect(teamsService.create('test_team_name')).rejects.toThrowError(
        ConflictException
      );
    });

    it('Should reject with unkown error', async () => {
      jest.spyOn(prisma.team, 'create').mockRejectedValueOnce({ code: 'TEST' });
      await expect(teamsService.create('test_team_name')).rejects.toThrowError(
        InternalServerErrorException
      );
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
      expect(teamsService.findTeamMembers(1)).resolves.toBe(aTeamMembers);
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.team, 'findUnique').mockResolvedValueOnce(null);
      expect(teamsService.findTeamMembers(2)).rejects.toThrow(
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
  });

  describe('addTeamMember', () => {
    it('Should return the team members', async () => {
      expect(teamsService.addTeamMember('test')).resolves.toBe(aTeamMembers);
    });

    it('Should reject if team not found', async () => {
      jest.spyOn(prisma.team, 'findUnique').mockResolvedValueOnce(null);
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
  });

  describe('getInviteToken', () => {
    it('Should return the invite token', async () => {
      expect(teamsService.getInviteToken(1)).resolves.toBe(aTeam.invite_token);
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
      expect(teamsService.getAssessments(1)).resolves.toBe([mockAssessment]);
    });
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
