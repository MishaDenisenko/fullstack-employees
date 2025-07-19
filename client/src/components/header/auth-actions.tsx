'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { logout, selectUser } from '@/shared/lib/authSlice';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { PATHS } from '@/constants';
import { LogIn, LogOut, User } from 'lucide-react';


export function AuthActions() {
    const { login, register } = PATHS;
    const isAuth = usePathname().startsWith('/auth');
    
    const user = useAppSelector(selectUser);
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
        router.replace(login);
    };
    
    if (isAuth) return null;
    
    if (user) {
        return (
            <>
                <Divider className={ 'h-6 mx-2' } orientation='vertical' />
                <h2 className='text-xl uppercase font-semibold underline underline-offset-4 mr-4 text-primary'>{ user.name }</h2>
                <Button variant='flat' startContent={ <LogOut size={ 20 } /> } onPress={ handleLogout }>
                    Logout
                </Button>
            </>
        );
    }
    
    return (
        <>
            <Divider className={ 'h-5 mx-2' } orientation='vertical' />
            <Link href={ register }>
                <Button variant='flat' startContent={ <User size={ 20 } /> }>
                    Sing Up
                </Button>
            </Link>
            <Link href={ login }>
                <Button isIconOnly variant='flat' startContent={ <LogIn size={ 20 } /> } />
            </Link>
        </>
    );
}
