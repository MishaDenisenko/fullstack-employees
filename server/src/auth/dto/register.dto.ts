import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'Обязательное поле' })
    @IsString({ message: 'Некорректные данные' })
    @MaxLength(20, { message: 'Слишком много символов' })
    name: string;
    
    @IsNotEmpty({ message: 'Обязательное поле' })
    @IsString({ message: 'Некорректные данные' })
    @IsEmail({}, { message: 'Некорректный email' })
    email: string;
    
    @IsNotEmpty({ message: 'Обязательное поле' })
    @IsStrongPassword({ minLength: 5, minSymbols: 0, minLowercase: 0, minUppercase: 0, minNumbers: 0 }, { message: 'Ненадежный пароль' })
    password: string;
}
