import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService, PrismaService, ConfigService]
})
export class EmployeeModule {}
