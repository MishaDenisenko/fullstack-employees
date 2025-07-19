'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAddEmployeeMutation } from '@/shared/api/employees';
import { isErrorWithMessage } from '@/utils/isErrorWithMessage';
import { EmployeeForm } from '@/components/employee-form';
import { BackLink } from '@/components/back-link';
import { Employee } from '@/entities';
import { PATHS } from '@/constants';

export default function AddEmployee() {
    const [addEmployee] = useAddEmployeeMutation();
    const [error, setError] = useState<string>('');
    const router = useRouter();
    
    const onSubmit = useCallback((data: Employee) => {
        (async () => {
            try {
                await addEmployee(data).unwrap();
                router.push(`${ PATHS.status }/created`);
            } catch (err) {
                isErrorWithMessage(err) ? setError(err.data.message) : setError('Unknown error');
            }
        })();
    }, [addEmployee, router]);
    
    return (
        <section>
            <BackLink />
            <EmployeeForm onSubmit={ onSubmit } btnText={ 'Add' } error={ error } />
        </section>
    );
}
