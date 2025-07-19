import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) {}
    
    public async create({ firstName, lastName, age, address }: CreateEmployeeDto, userId: string) {
        if (!firstName || !lastName || !age || !address) throw new BadRequestException('Все поля обязательны');
        
        const isExist = await this.prisma.employee.findFirst({ where: { firstName, lastName } });
        if (isExist) throw new BadRequestException('Работник с таким именем и фамилией уже существует');
        
        try {
            return await this.prisma.employee.create({
                data: {
                    firstName,
                    lastName,
                    age,
                    address,
                    userId
                }
            });
        } catch {
            throw new InternalServerErrorException('Не удалось добавить сотрудника');
        }
    }
    
    public async findAll() {
        try {
            return await this.prisma.employee.findMany();
        } catch {
            throw new InternalServerErrorException('Не удалось получить сотрудников');
        }
    }
    
    public async findOne(id: string) {
        try {
            return await this.prisma.employee.findFirst({ where: { id } });
        } catch {
            throw new InternalServerErrorException('Не удалось получить сотрудника');
        }
    }
    
    public async update(id: string, updateDto: UpdateEmployeeDto, userId: string) {
        const exist = await this.getEmployeeById(id)
        if (userId !== exist.userId) throw new ForbiddenException('Недостаточно прав для редактирования')
        
        const employeeWithSameData = await this.prisma.employee.findFirst({
            where: {
                firstName: updateDto.firstName,
                lastName: updateDto.lastName,
            }
        });
        if (!!employeeWithSameData && employeeWithSameData.id != id) throw new BadRequestException('Работник с таким именем и фамилией уже существует');
        
        try {
            return !!await this.prisma.employee.update({
                where: { id },
                data: { ...updateDto }
            });
        } catch (e) {
            throw new InternalServerErrorException('Не удалось отредактировать информацию');
        }
    }
    
    public async remove(id: string, userId: string) {
        const exist = await this.getEmployeeById(id)
        if (userId !== exist.userId) throw new ForbiddenException('Недостаточно прав для удаления')
        
        try {
            return !!await this.prisma.employee.delete({ where: { id } });
        } catch (e) {
            throw new InternalServerErrorException('Не удалось удалить сотрудника');
        }
    }
    
    private async getEmployeeById(id: string) {
        const exist = await this.prisma.employee.findFirst({ where: { id } });
        if (!exist) throw new BadRequestException('Работник не найден');
        
        return exist
    }
}
