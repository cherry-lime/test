import { Test } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import {
  aTeam,
  mockCreateTeamBody,
  aUpdateTeam,
} from '../prisma/mock/mockTeam';
import { aTeamMembers } from '../prisma/mock/mockTeamMembers';
import { aAssessment } from '../prisma/mock/mockAssessment';
import { InviteTokenDto } from './dto/invite-token.dto';

const moduleMocker = new ModuleMocker(global);

describe('TeamsController', () => {
  let teamController: TeamsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TeamsController],
    })
      .useMocker((token) => {
        if (token === TeamsService) {
          return {
            create: jest.fn().mockResolvedValue(aTeam),
            findOne: jest.fn().mockResolvedValue(aTeam),
            findUnique: jest.fn().mockResolvedValue(aTeam),
            findTeamMembers: jest.fn().mockResolvedValue(aTeamMembers),
            addTeamMember: jest.fn().mockResolvedValue(aTeamMembers),
            getInviteToken: jest.fn().mockResolvedValue({
              invite_token: 'test_invite_token',
            } as InviteTokenDto),
            getAssessments: jest.fn().mockResolvedValue([aAssessment]),
            updateTeam: jest.fn().mockResolvedValue(aTeam),
          };
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

    //teamController = moduleRef.get(TeamsController);
    teamController = moduleRef.get<TeamsController>(TeamsController);
  });

  it('should be defined', () => {
    expect(teamController).toBeDefined();
  });

  describe('createTeam', () => {
    it('Should return the created team', async () => {
      expect(teamController.create(mockCreateTeamBody)).resolves.toBe(aTeam);
    });
  });

  describe('getTeam', () => {
    it('Should return the team', async () => {
      expect(teamController.findOne(1)).resolves.toBe(aTeam);
    });
  });

  describe('getTeamMembers', () => {
    it('Should return the team members', async () => {
      expect(teamController.findTeamMembers(1)).resolves.toBe(aTeamMembers);
    });
  });

  describe('addTeamMember', () => {
    it('Should return the team members', async () => {
      expect(teamController.addTeamMember('test')).resolves.toBe(aTeamMembers);
    });
  });

  describe('getInviteToken', () => {
    it('Should return the invite token', async () => {
      expect(teamController.getInviteToken(1)).resolves.toStrictEqual({
        invite_token: 'test_invite_token',
      } as InviteTokenDto);
    });
  });

  describe('getAssessments', () => {
    it('Should return the assessments', async () => {
      expect(teamController.getTeamAssessments(1)).resolves.toEqual([
        aAssessment,
      ]);
    });
  });

  describe('updateTeam', () => {
    it('Should return the updateTeamDto', async () => {
      expect(teamController.updateTeam(1, aUpdateTeam)).resolves.toBe(aTeam);
    });
  });
});
