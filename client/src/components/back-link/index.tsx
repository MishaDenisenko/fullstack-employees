'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { MoveLeft } from 'lucide-react';

export function BackLink() {
    const { back } = useRouter();
    
    return (
        <Button
            className={ 'text-medium' }
            color={ 'primary' }
            variant={ 'light' }
            startContent={ <MoveLeft size={ 20 } /> }
            onPress={ back }
        >
            Back
        </Button>
    );
}
