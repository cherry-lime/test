import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    return req.cookies?.token?.token || null;
  }

  /**
   * Verify the user information
   * @param payload username
   * @returns user
   */
  async validate(payload: { username: string }) { // , , req: RequestType
    const user = await this.prismaService.user.findUnique({
      where: {
        username: payload.username,
      },
    });
    
    return user;
  }
    
}
