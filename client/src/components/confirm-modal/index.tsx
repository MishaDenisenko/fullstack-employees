'use client';

import { useRouter } from 'next/navigation';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { Button } from '@heroui/button';
import { useRemoveEmployeeMutation } from '@/shared/api/employees';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { closeModal } from '@/shared/features/deleteEmployeeModalSlice';
import { PATHS } from '@/constants';
import loading from '@/app/loading';


export function ConfirmModal() {
    const {isOpen, employee} = useAppSelector(state => state.deleteEmployeeModalSlice)
    const [removeEmployee] = useRemoveEmployeeMutation();
    
    const dispatch = useAppDispatch()
    const router = useRouter();
    
    const handleDeleteEmployee = () => {
        (async () => {
            !!employee && loading() && await removeEmployee(employee.id);
            router.push(`${ PATHS.status }/deleted`);
        })();
    };
    
    return (
        <Modal isOpen={ isOpen } hideCloseButton>
            <ModalContent>
                { () => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>Delete Confirmation</ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure you want to delete employee
                                {' '}
                                <span className={ 'capitalize font-semibold' }>{ employee?.firstName }</span>
                                {' '}
                                <span className={ 'capitalize font-semibold' }>{ employee?.lastName }</span>
                                {' '}
                                permanently?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' variant='light' onPress={ handleDeleteEmployee }>
                                Yes
                            </Button>
                            <Button color='primary' onPress={ () => dispatch(closeModal()) }>
                                No
                            </Button>
                        </ModalFooter>
                    </>
                ) }
            </ModalContent>
        </Modal>
    );
}
