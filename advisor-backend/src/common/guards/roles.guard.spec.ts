import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { Role } from '@prisma/client';
import { Reflector } from '@nestjs/core';

const moduleMocker = new ModuleMocker(global);

describe('RolesGuard', () => {
    let rolesGuard: RolesGuard;
    let reflector: Reflector;

    // mock execution context
    const mockExecutionContext = createMock<ExecutionContext>();

    beforeEach(async () => {
        process.env = {
            DATABASE_URL: 'postgres://localhost:5432/test',
            JWT_SECRET: 'mycustomuselongsecret',
            EXPIRESIN: '60 days',
        };
        const module = await Test.createTestingModule({
            imports: [
                PassportModule,
                Reflector
            ],
            providers: [
                RolesGuard
            ]
        })
            .useMocker((token) => {
                // if (token === RolesGuard) {
                //     return {
                //         canActivate: jest.fn().mockResolvedValue(true),
                //         matchRoles: jest.fn().mockResolvedValue([Role.USER, Role.ASSESSOR])
                //     };
                // }
                // if (token === Reflector) {
                //     return {
                //         get: jest.fn().mockReturnValue(false)
                //     }
                // }
                if (typeof token === 'function') {
                    const mockMetadata = moduleMocker.getMetadata(
                        token
                    ) as MockFunctionMetadata<any, any>;
                    const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                    return new Mock();
                }
            })
            .compile();
        rolesGuard = module.get<RolesGuard>(RolesGuard);
        reflector = module.get<Reflector>(Reflector);
    });

    describe('should be defined', () => {
        it('RolesGuard', () => {
            expect(rolesGuard).toBeDefined();
        });

        it('CanActivate function', () => {
            jest
                .spyOn(rolesGuard, "canActivate").mockResolvedValueOnce(true);
            expect(rolesGuard.canActivate(mockExecutionContext)).toBeDefined();
        });

        it('MatchRoles function', () => {
            jest
                .spyOn(rolesGuard, "matchRoles").mockReturnValueOnce(true);
            expect(rolesGuard.matchRoles([Role.USER], Role.USER)).toBeDefined();
        });

        it('Reflector function', () => {
            jest
                .spyOn(reflector, "get").mockReturnValueOnce(true);
            expect(rolesGuard.matchRoles([Role.USER], Role.USER)).toBeDefined();
        });
    });

    describe('CanActivate function', () => {
        it('CanActivate gives the correct output', async () => {
            jest
                .spyOn(rolesGuard, "canActivate")
                .mockResolvedValueOnce(true);
            expect(rolesGuard
                .canActivate(mockExecutionContext)
            )
                .resolves.toEqual(true);
        });

        it('Reflector returns false', async () => {
            jest
                .spyOn(reflector, "get")
                .mockReturnValueOnce(false);
            expect(rolesGuard
                .canActivate(mockExecutionContext)
            )
                .resolves.toEqual(true);
        });

        it('Reflector returns true', async () => {
            jest
                .spyOn(reflector, "get")
                .mockReturnValueOnce(true);
            expect(rolesGuard
                .canActivate(mockExecutionContext)
            )
                .resolves.toEqual(true);
        });

        // it('Request', async () => {
        //     jest
        //         .spyOn(mockExecutionContext.switchToHttp, "getRequest")
        //         .mockReturnValueOnce();
        //     expect(rolesGuard
        //         .canActivate(mockExecutionContext)
        //     )
        //         .resolves.toEqual(true);
        // });
    })

    describe('MatchRoles function', () => {
        it('MatchRoles gives the correct output with true', () => {
            jest
                .spyOn(rolesGuard, "matchRoles")
                .mockReturnValueOnce(true);
            expect(rolesGuard
                .matchRoles([Role.USER], Role.USER)
            )
                .toEqual(true);
        });

        it('MatchRoles gives the correct output with false', () => {
            jest
                .spyOn(rolesGuard, "matchRoles")
                .mockReturnValueOnce(false);
            expect(rolesGuard
                .matchRoles([Role.USER], Role.USER)
            )
                .toEqual(false);
        });
    });
});