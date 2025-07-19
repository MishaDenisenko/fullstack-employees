import { Controller, Get, Post, Put, Body, Param, Delete, HttpCode, HttpStatus, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
    
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('add')
    public async create(@Body() createDto: CreateEmployeeDto, @Req() req: Request) {
        return this.employeeService.create(createDto, req.user['id']);
    }
    
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    public async findAll() {
        return this.employeeService.findAll();
    }
    
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    public async findOne(@Param('id') id: string) {
        return this.employeeService.findOne(id);
    }
    
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Put('edit/:id')
    public async update(@Param('id') id: string, @Body() updateDto: UpdateEmployeeDto, @Req() req: Request) {
        return this.employeeService.update(id, updateDto, req.user['id']);
    }
    
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('remove/:id')
    public async remove(@Param('id') id: string, @Req() req: Request) {
        return this.employeeService.remove(id, req.user['id']);
    }
}
