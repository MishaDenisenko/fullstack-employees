'use client';

import { Input as HeroInput } from '@heroui/input';
import { Control, useController } from 'react-hook-form';


type InputProps = {
    name: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    control: Control<any>;
    required?: string;
}

export function Input({ name, label, placeholder, control, type = 'text', required = '' }: InputProps) {
    const { field, fieldState: { invalid, error } } = useController({
        name,
        control,
        rules: { required }
    });
    
    return (
        <HeroInput
            id={ name }
            label={ label }
            type={ type }
            placeholder={ placeholder }
            isInvalid={ invalid }
            size={ 'sm' }
            radius={ 'md' }
            
            value={ field.value }
            name={ field.name }
            onChange={ field.onChange }
            onBlur={ field.onBlur }
            errorMessage={ `${ error?.message ?? '' }` }
        />
    );
}
