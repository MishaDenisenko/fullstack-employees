import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={ 'flex flex-col w-full justify-center items-center' }>
            { children }
        </div>
    );
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return [{ type: 'login' }, { type: 'register' }];
}