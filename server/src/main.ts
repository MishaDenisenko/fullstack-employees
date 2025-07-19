import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
    
    app.useGlobalPipes(
        new ValidationPipe({
            // whitelist: true,
            // forbidNonWhitelisted: true,
            // transform: true,
            stopAtFirstError: false,
            exceptionFactory: (errors) => {
                const result = {};
                
                for (const error of errors) {
                    if (error.constraints) {
                        result[error.property] = Object.values(error.constraints)[0];
                    }
                }
                
                return new BadRequestException(result);
            },
        }),
    );
    
    await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
