import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }
    
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Post('register')
    public async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }
    
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Get('current')
    public async current(@Req() req: Request) {
        return req.user;
    }
}
