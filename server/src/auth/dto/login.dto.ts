import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Обязательное поле' })
    @IsString({ message: 'Некорректные данные' })
    @IsEmail({}, { message: 'Некорректный email' })
    email: string;
    
    @IsNotEmpty({ message: 'Обязательное поле' })
    password: string;
}
