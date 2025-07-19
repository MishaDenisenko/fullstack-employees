'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Link } from '@heroui/link';
import { Button } from '@heroui/button';
import { Input } from '@/shared/ui/input';
import { TUserLoginData, useLoginMutation } from '@/shared/api/auth';
import { isErrorWithMessage } from '@/utils/isErrorWithMessage';
import { PATHS } from '@/constants';
import { ErrorMessage } from '@/components/error-message';


interface LoginProps {
    setSelected: (value: 'login' | 'register') => void;
}

export function Login({ setSelected }: LoginProps) {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [login, { isLoading }] = useLoginMutation();
    
    const { control, handleSubmit, formState: { errors } } = useForm<TUserLoginData>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });
    
    const onSubmit = async (data: TUserLoginData) => {
        try {
            await login(data).unwrap();
            router.push(PATHS.home);
        } catch (err) {
            isErrorWithMessage(err) ? setError(err.data.message) : setError('Unknown error');
        }
    };
    
    return (
        <form className='flex flex-col gap-4' onSubmit={ handleSubmit(onSubmit) }>
            <Input name={ 'email' } label={ 'Email' } control={ control } type={ 'email' } required={ 'Обязательное поле' } />
            <Input name={ 'password' } label={ 'Password' } control={ control } type={ 'password' } required={ 'Обязательное поле' } />
            
            <p className='text-center text-small'>
                Нет аккаунта?{ ' ' }
                <Link className='cursor-pointer' size='sm' onPress={ () => setSelected('register') }>
                    Зарегистрируйтесь
                </Link>
            </p>
            <div className='flex gap-2 justify-end'>
                <Button fullWidth color='primary' type='submit' isLoading={ isLoading }>
                    Войти
                </Button>
            </div>
            { !!error && <ErrorMessage message={ error } /> }
        </form>
    );
}
