'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import { store } from '@/shared/lib/store';
import { AuthProvider } from '@/components/auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ThemeProvider>
                <Provider store={ store }>
                    <AuthProvider>
                        { children }
                    </AuthProvider>
                </Provider>
            </ThemeProvider>
        </HeroUIProvider>
    );
}