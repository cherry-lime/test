import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '../../node_modules/@nestjs/passport';
import { JwtModule } from '../../node_modules/@nestjs/jwt'; 
import { PrismaService } from '../../src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../../src/user/user.module';

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
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
