'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/shared/lib/authSlice';
import { PATHS } from '@/constants';
import { Users } from 'lucide-react';

export function Logo() {
    const isAuth = usePathname().startsWith('/auth');
    const user = useAppSelector(selectUser);
    const { home, login } = PATHS;
    
    if (isAuth) return (
        <div className={ 'items-center flex gap-2' }>
            <Users size={ 28 } />
            <h1 className={ 'font-bold text-4xl' }>Employees</h1>
        </div>
    )
    
    return (
        <div className={ 'items-center flex gap-2' }>
            <Users size={ 28 } />
            <Link href={ user ? home : login }>
                <h1 className={ 'font-bold text-4xl' }>Employees</h1>
            </Link>
        </div>
    );
}