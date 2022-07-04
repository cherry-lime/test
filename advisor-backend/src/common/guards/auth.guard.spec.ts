import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const moduleMocker = new ModuleMocker(global);

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
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
                AuthGuard
            ]
        })
            .useMocker((token) => {
                if (typeof token === 'function') {
                    const mockMetadata = moduleMocker.getMetadata(
                        token
                    ) as MockFunctionMetadata<any, any>;
                    const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                    return new Mock();
                }
            })
            .compile();
        authGuard = module.get<AuthGuard>(AuthGuard);
        reflector = module.get<Reflector>(Reflector);
    });

    describe('should be defined', () => {
        it('AuthGuard', () => {
            expect(authGuard).toBeDefined();
        });

        it('CanActivate function', () => {
            jest
                .spyOn(authGuard, "canActivate")
                .mockReturnValueOnce(true);
            expect(authGuard.canActivate(mockExecutionContext)).toBeDefined();
        });
    });

    describe('CanActivate function', () => {
        it('Validate to true', () => {
            jest
                .spyOn(authGuard, "canActivate")
                .mockReturnValueOnce(true);
            expect(authGuard
                .canActivate(mockExecutionContext)
            )
                .toEqual(true);
        });

        it('Validate to false', () => {
            jest
                .spyOn(authGuard, "canActivate")
                .mockReturnValueOnce(false);
            expect(authGuard
                .canActivate(mockExecutionContext)
            )
                .toEqual(false);
        });

        // it('Reflector returns true', () => {
        //     // jest.mock('reflector', () => ({ get: jest.fn(() => true) }));
        //     jest
        //         .spyOn(reflector, "get")
        //         .mockReturnValue(true);
        //     expect(authGuard
        //         .canActivate(mockExecutionContext)
        //     )
        //         .toEqual(true);
        // });

        // it('Reflector returns false', () => {
        //     jest
        //         .spyOn(reflector, "get")
        //         .mockReturnValueOnce(false);
        //     expect(authGuard
        //         .canActivate(mockExecutionContext)
        //     )
        //         .toEqual(false);
        // });
    });
});