'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentQuery } from '@/shared/api/auth';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectIsAuthenticated } from '@/shared/lib/authSlice';
import Loading from '@/app/loading';
import { PATHS } from '@/constants';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isLoading } = useCurrentQuery();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const router = useRouter();
    
    useEffect(() => {
        !isLoading && !isAuthenticated && router.replace(PATHS.login);
    }, [isLoading, isAuthenticated, router]);
    
    return isLoading ? <Loading /> : children;
}
