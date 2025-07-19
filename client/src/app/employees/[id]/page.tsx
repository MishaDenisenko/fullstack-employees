'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Divider } from '@heroui/divider';
import { Skeleton } from '@heroui/skeleton';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/shared/lib/authSlice';
import { useGetEmployeeByIdQuery } from '@/shared/api/employees';
import { openModal } from '@/shared/features/deleteEmployeeModalSlice';
import { PATHS } from '@/constants';
import { BackLink } from '@/components/back-link';
import { Trash2, UserRoundPen } from 'lucide-react';

export default function EmployeeInfo({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    
    const { data, isLoading } = useGetEmployeeByIdQuery(id || '');
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    
    if (isLoading) return <Skeleton />;
    
    if (!isLoading && !data) return notFound();
    
    return (
        <section>
            <BackLink />
            <Card className={ 'px-5 py-4 max-w-2xl mx-auto mt-5' }>
                <CardHeader className={ 'text-large font-bold' }>Employee information</CardHeader>
                <CardBody className={ 'grid grid-cols-3 wrap gap-3 items-end' }>
                    <div className={ 'flex col-span-1 gap-5 items-end' }>
                        <span className={ 'text-gray-500' }>First Name:</span>
                        <span>{ data?.firstName }</span>
                    </div>
                    <div className={ 'flex col-span-1 gap-5 items-end' }>
                        <span className={ 'text-gray-500' }>Last Name:</span>
                        <span>{ data?.lastName }</span>
                    </div>
                    <div className={ 'flex col-span-1 gap-5 items-end' }>
                        <span className={ 'text-gray-500' }>Age:</span>
                        <span>{ data?.age }</span>
                    </div>
                    <div className={ 'flex col-span-3 gap-5 items-end' }>
                        <span className={ 'text-gray-500' }>Address:</span>
                        <span>{ data?.address }</span>
                    </div>
                </CardBody>
                {
                    user?.id === data?.userId && (
                        <>
                            <Divider className={ 'my-3' } />
                            <CardFooter className={ 'flex gap-5' }>
                                <Link href={ `${ PATHS.employeeEdit }/${ data?.id }` }>
                                    <Button color={ 'primary' } startContent={ <UserRoundPen size={ 20 } /> }>
                                        Edit
                                    </Button>
                                </Link>
                                <Button color={ 'danger' } startContent={
                                    <Trash2 size={ 20 } /> } onPress={ () => !!data && dispatch(openModal(data))
                                }>
                                    Remove
                                </Button>
                            </CardFooter>
                        </>
                    )
                }
            </Card>
        </section>
    );
}
