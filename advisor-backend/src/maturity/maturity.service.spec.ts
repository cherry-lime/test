import { Test, TestingModule } from '@nestjs/testing';
import { mockPrisma } from '../prisma/mock/mockPrisma';
import { PrismaService } from '../prisma/prisma.service';
import { MaturityService } from './maturity.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { aMaturity } from '../prisma/mock/mockMaturity';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('MaturityService', () => {
  let categoryService: MaturityService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaturityService],
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

    categoryService = module.get<MaturityService>(MaturityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('create', () => {
    it('Should return the created maturity', async () => {
      expect(await categoryService.create(1, aMaturity)).toEqual(aMaturity);
    });

    it('Should throw an error if the maturity name, template combo already exists', async () => {
      jest
        .spyOn(prisma.maturity, 'create')
        .mockRejectedValueOnce({ code: 'P2002' });
      await expect(categoryService.create(1, aMaturity)).rejects.toThrowError(
        ConflictException
      );
    });

    it('Should throw an error if template does not exist', async () => {
      jest
        .spyOn(prisma.maturity, 'create')
        .mockRejectedValueOnce({ code: 'P2025' });
      await expect(categoryService.create(1, aMaturity)).rejects.toThrowError(
        NotFoundException
      );
    });

    it('Should throw an InternalServerError if the prisma throws an error', async () => {
      jest
        .spyOn(prisma.maturity, 'create')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(categoryService.create(1, aMaturity)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('findAll', () => {
    it('Should return all the categories', async () => {
      expect(await categoryService.findAll(1)).toEqual([aMaturity]);
    });
  });

  describe('findOne', () => {
    it('Should return the category', async () => {
      expect(await categoryService.findOne(1)).toEqual(aMaturity);
    });

    it('Should throw an error if the category does not exist', async () => {
      jest.spyOn(prisma.maturity, 'findUnique').mockResolvedValueOnce(null);
      await expect(categoryService.findOne(1)).rejects.toThrowError(
        NotFoundException
      );
    });
  });

  describe('update', () => {
    it('Should return the updated category', async () => {
      expect(await categoryService.update(1, aMaturity)).toEqual(aMaturity);
    });

    it('Should throw an error if the category does not exist', async () => {
      jest
        .spyOn(prisma.maturity, 'update')
        .mockRejectedValueOnce({ code: 'P2025' });
      await expect(categoryService.update(1, aMaturity)).rejects.toThrowError(
        NotFoundException
      );
    });

    it('Should throw an error if the maturity name, template combo already exists', async () => {
      jest.spyOn(prisma.maturity, 'update').mockRejectedValueOnce({
        code: 'P2002',
      });
      await expect(categoryService.update(1, aMaturity)).rejects.toThrowError(
        ConflictException
      );
    });

    it('Should throw an InternalServerError if the prisma throws an error', async () => {
      jest
        .spyOn(prisma.maturity, 'update')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(categoryService.update(1, aMaturity)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('delete', () => {
    it('Should return the deleted category', async () => {
      expect(await categoryService.delete(1)).toEqual(aMaturity);
    });

    it('Should throw an error if the category does not exist', async () => {
      jest
        .spyOn(prisma.maturity, 'delete')
        .mockRejectedValueOnce({ code: 'P2025' });
      await expect(categoryService.delete(1)).rejects.toThrowError(
        NotFoundException
      );
    });

    it('Should throw an InternalServerError if the prisma throws an error', async () => {
      jest
        .spyOn(prisma.maturity, 'delete')
        .mockRejectedValueOnce({ code: 'TEST' });
      await expect(categoryService.delete(1)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });
});
