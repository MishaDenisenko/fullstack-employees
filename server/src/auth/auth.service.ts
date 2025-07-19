import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}
    
    public async register({ name, email, password }: RegisterDto) {
        if (!name || !email || !password) throw new BadRequestException('Заполните все поля');
        
        const isExist = await this.prisma.user.findFirst({ where: { email } });
        if (isExist) throw new BadRequestException('Пользователь с таким email уже существует');
        
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        
        const user: User = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });
        
        return this.buildResponse(user);
    }
    
    public async login({ email, password }: LoginDto) {
        if (!email || !password) throw new BadRequestException('Заполните все поля');
        
        const user: User = await this.prisma.user.findFirst({ where: { email } });
        if (!user) throw new BadRequestException('Введен некорректный email');
        
        const isCorrectPassword = await compare(password, user.password);
        if (!isCorrectPassword) throw new ForbiddenException('Введен некорректный пароль');
        
        return this.buildResponse(user);
    }
    
    private buildResponse({ id, name, email }: User) {
        const token = sign({ id }, this.config.get('JWT_SECRET'), { expiresIn: '30d' });
        
        return { id, name, email, token };
    }
}
