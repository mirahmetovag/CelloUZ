import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './../users/users.module';
import { MailModule } from './../mail/mail.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [JwtModule.register({
secret: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn: '24h'},
    global: true
  }),
CacheModule.register({ttl: 120000}), UsersModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
