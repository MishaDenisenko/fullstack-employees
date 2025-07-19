import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException('Пользователь не авторизован');
        
        try {
            const decoded = verify(token, this.config.get('JWT_SECRET'));
            request.user = await this.prisma.user.findFirst({ where: { id: decoded['id'] } });
        } catch {
            throw new UnauthorizedException();
        }
        
        return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') || [];
        return type === 'Bearer' ? token : undefined;
    }
}
