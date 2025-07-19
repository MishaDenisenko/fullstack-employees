import Link from 'next/link';
import { Button } from '@heroui/button';
import { EmployeesTable } from '@/components/employees-table';
import { PATHS } from '@/constants';
import { CirclePlus } from 'lucide-react';


export default function Home() {
    const { employeeAdd } = PATHS;
    
    return (
        <section className={ 'flex flex-col gap-5' }>
            <Link href={ employeeAdd }>
                <Button variant='flat' color={ 'primary' } startContent={ <CirclePlus size={ 20 } /> }>
                    Add employee
                </Button>
            </Link>
            <EmployeesTable />
        </section>
    );
}
