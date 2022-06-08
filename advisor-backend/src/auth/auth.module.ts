import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '../../node_modules/@nestjs/passport';
import { JwtModule } from '../../node_modules/@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
