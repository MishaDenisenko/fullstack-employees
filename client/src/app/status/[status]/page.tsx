import Link from 'next/link';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/modal';
import { Divider } from '@heroui/divider';
import { Success } from '@/shared/ui/icons';
import { PATHS } from '@/constants';

const statuses: Record<string, string> = {
    created: 'Employee created successfully',
    updated: 'Employee`s information updated successfully',
    deleted: 'Employee removed successfully'
};

interface StatusPageParams {
    params: Promise<{ status: 'created' | 'updated' | 'deleted' }>;
}

export default async function StatusPage({ params }: StatusPageParams) {
    const { status } = await params;
    const { home } = PATHS;
    
    return (
        <Modal isOpen hideCloseButton size={ '2xl' } backdrop={ 'blur' }>
            <ModalContent>
                <ModalBody className={ 'items-center my-10' }>
                    <Success />
                    <p className={ 'text-2xl font-bold' }>{ statuses[status] }</p>
                </ModalBody>
                <Divider />
                <ModalFooter className={ 'justify-center my-3' }>
                    <Link href={ home }>
                        <Button color={ 'success' } size={ 'lg' }>
                            Home Page
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export async function generateStaticParams() {
    return [{ status: 'created' }, { status: 'updated' }, { status: 'deleted' }];
}
