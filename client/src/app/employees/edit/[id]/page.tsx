'use client';

import { use, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditEmployeeMutation, useGetEmployeeByIdQuery } from '@/shared/api/employees';
import { isErrorWithMessage } from '@/utils/isErrorWithMessage';
import { BackLink } from '@/components/back-link';
import { EmployeeForm } from '@/components/employee-form';
import { PATHS } from '@/constants';
import { Employee } from '@/entities';

export default function EditEmployee({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    
    const [editEmployee] = useEditEmployeeMutation();
    const { data, isLoading } = useGetEmployeeByIdQuery(id || '');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    
    const onSubmit = useCallback((employee: Employee) => {
        (async () => {
            try {
                const editedEmployee: Employee = {
                    ...data,
                    ...employee
                };
                
                await editEmployee(editedEmployee).unwrap();
                router.push(`${ PATHS.status }/updated`);
            } catch (err) {
                isErrorWithMessage(err) ? setError(err.data.message) : setError('Unknown error');
            }
        })();
    }, [data, editEmployee, router]);
    
    if (isLoading) return <span>Loading...</span>;
    
    return (
        <section>
            <BackLink />
            <EmployeeForm onSubmit={ onSubmit } btnText={ 'Edit' } defaultValues={ data } error={ error } />
        </section>
    );
}
