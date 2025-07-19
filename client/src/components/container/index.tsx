import React from 'react';

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className={ 'max-w-screen-xl mx-auto p-6' }>{ children }</div>
    );
}
