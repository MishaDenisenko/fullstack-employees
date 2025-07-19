'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@heroui/button';
import { Moon, Sun } from 'lucide-react';


export function ThemeSelector() {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) return null;
    
    return (
        <Button
            variant='flat'
            isIconOnly
            onPress={ () => setTheme(prev => prev === 'dark' ? 'light' : 'dark') }
        >
            { theme === 'dark' ? <Moon size={ 20 } /> : <Sun size={ 20 } /> }
        </Button>
    );
}
