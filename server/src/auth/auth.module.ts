import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, ConfigService],
})
export class AuthModule {}
