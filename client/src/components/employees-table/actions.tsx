'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { Tooltip } from '@heroui/tooltip';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { openModal } from '@/shared/features/deleteEmployeeModalSlice';
import { selectUser } from '@/shared/lib/authSlice';
import { Employee } from '@/entities';
import { PATHS } from '@/constants';
import { Eye, Trash2, UserRoundPen } from 'lucide-react';

interface IActions {
    employeeData: Employee;
}

export function Actions({ employeeData }: IActions) {
    const { employee, employeeEdit } = PATHS;
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    
    const deleteEmployee = useCallback(() => {
        dispatch(openModal(employeeData));
    }, [dispatch, employeeData]);
    
    return (
        <div className='relative flex items-center gap-4'>
            <Tooltip content='Details'>
                <Link href={ `${ employee }/${ employeeData.id }` } className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                    <Eye size={ 20 } />
                </Link>
            </Tooltip>
            
            {
                user?.id === employeeData.userId && (
                    <>
                        <Tooltip content='Edit employee' closeDelay={ 100 } showArrow>
                            <Link href={ `${ employeeEdit }/${ employeeData.id }` } className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                <UserRoundPen size={ 20 } />
                            </Link>
                        </Tooltip>
                        <Tooltip color='danger' content='Delete employee' closeDelay={ 100 } showArrow>
                            <span className='text-lg text-danger cursor-pointer active:opacity-50' onClick={ deleteEmployee }>
                                <Trash2 size={ 20 } />
                            </span>
                        </Tooltip>
                    </>
                )
            }
        </div>
    );
}
