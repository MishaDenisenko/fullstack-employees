'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Employee } from '@/entities';
import { Input } from '@/shared/ui/input';
import { ErrorMessage } from '@/components/error-message';

interface IEmployeeForm {
    btnText: string,
    error?: string,
    defaultValues?: Employee,
    onSubmit: (values: Employee) => void,
}


export function EmployeeForm(props: IEmployeeForm) {
    const { defaultValues, btnText, error, onSubmit } = props;
    
    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<Employee>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues
    });
    
    return (
        <Card className={ 'max-w-xl mx-auto px-5 py-4' }>
            <CardHeader className={ 'text-xl font-bold' }>{ btnText } employee form</CardHeader>
            <CardBody>
                <form className={ 'flex flex-col gap-5' } onSubmit={ handleSubmit(onSubmit) }>
                    <Input name={ 'firstName' } label={ 'First Name' } control={ control } required={ 'Обязательное поле' } />
                    <Input name={ 'lastName' } label={ 'Last Name' } control={ control } required={ 'Обязательное поле' } />
                    <Input name={ 'age' } label={ 'Age' } control={ control } type={ 'number' } required={ 'Обязательное поле' } />
                    <Input name={ 'address' } label={ 'Address' } control={ control } required={ 'Обязательное поле' } />
                    <Button size={ 'lg' } color='primary' type='submit' isDisabled={ !isDirty || !isValid }>
                        { btnText }
                    </Button>
                    { !!error && <ErrorMessage message={ error } /> }
                </form>
            </CardBody>
        </Card>
    );
}
