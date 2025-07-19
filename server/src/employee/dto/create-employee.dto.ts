import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
    @IsNotEmpty({ message: 'Обязательное поле' })
    @MaxLength(30, { message: 'Имя слишком длинное' })
    @IsString({ message: 'Некорректные данные' })
    firstName: string;
    
    @IsNotEmpty({ message: 'Обязательное поле' })
    @MaxLength(30, { message: 'Слишком много символов' })
    @IsString({ message: 'Некорректные данные' })
    lastName: string;
    
    @IsNotEmpty({ message: 'Обязательное поле' })
    @MaxLength(3, { message: 'Некорректный возраст' })
    @IsString({ message: 'Некорректные данные' })
    age: string;
    
    @IsNotEmpty({ message: 'Обязательное поле' })
    @MaxLength(30, { message: 'Слишком много символов' })
    @IsString({ message: 'Некорректные данные' })
    address: string;
}
