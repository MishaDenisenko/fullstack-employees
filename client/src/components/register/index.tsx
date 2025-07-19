'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Link } from '@heroui/link';
import { Button } from '@heroui/button';
import { Input } from '@/shared/ui/input';
import { TUserRegisterData, useRegisterMutation } from '@/shared/api/auth';
import { isErrorWithMessage } from '@/utils/isErrorWithMessage';
import { ErrorMessage } from '@/components/error-message';
import { PATHS } from '@/constants';

interface RegisterProps {
    setSelected: (value: 'register' | 'login') => void;
}

export function Register({ setSelected }: RegisterProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [register, { isLoading }] = useRegisterMutation();
    
    const { control, handleSubmit, formState: { errors } } = useForm<TUserRegisterData>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    
    const onSubmit = async (data: TUserRegisterData) => {
        try {
            await register(data).unwrap();
            router.push(PATHS.home);
        } catch (err) {
            isErrorWithMessage(err) ? setError(err.data.message) : setError('Unknown error');
        }
    };
    
    return (
        <form className='flex flex-col gap-4' onSubmit={ handleSubmit(onSubmit) }>
            <Input name={ 'name' } label={ 'Name' } control={ control } type={ 'text' } required={ 'Обязательное поле' } />
            <Input name={ 'email' } label={ 'Email' } control={ control } type={ 'email' } required={ 'Обязательное поле' } />
            <Input name={ 'password' } label={ 'Password' } control={ control } type={ 'password' } required={ 'Обязательное поле' } />
            
            <p className='text-center text-small'>
                Уже зарегистрированы?{ ' ' }
                <Link className='cursor-pointer' size='sm' onPress={ () => setSelected('login') }>
                    Войти
                </Link>
            </p>
            <div className='flex gap-2 justify-end'>
                <Button fullWidth color='primary' type='submit' isLoading={ isLoading }>
                    Зарегистрироваться
                </Button>
            </div>
            { !!error && <ErrorMessage message={ error } /> }
        </form>
    );
}
