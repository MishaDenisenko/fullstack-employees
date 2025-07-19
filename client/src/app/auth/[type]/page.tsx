'use client';

import { use, useState } from 'react';
import { Tab, Tabs } from '@heroui/tabs';
import { Card, CardBody } from '@heroui/card';
import { Login } from '@/components/login';
import { Register } from '@/components/register';

interface AuthPageParams {
    params: Promise<{ type: 'login' | 'register' }>;
}

export default function AuthPage({ params }: AuthPageParams) {
    const { type } = use(params);
    const [selected, setSelected] = useState(type);
    
    return (
        <Card className={ 'max-w-full min-w-80 max-h-[450px]' }>
            <CardBody className='overflow-hidden'>
                <Tabs
                    fullWidth
                    size='md'
                    selectedKey={ selected }
                    onSelectionChange={ (key) => setSelected(key as typeof type) }
                >
                    <Tab key='login' title='Вход'>
                        <Login setSelected={ setSelected } />
                    </Tab>
                    <Tab key='register' title='Регистрация'>
                        <Register setSelected={ setSelected } />
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    );
}