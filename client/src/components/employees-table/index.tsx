'use client';

import { Table, TableColumn, TableHeader, TableBody, TableRow, getKeyValue, TableCell } from '@heroui/table';
import { Skeleton } from '@heroui/skeleton';
import { useGetAllEmployeesQuery } from '@/shared/api/employees';
import { Employee } from '@/entities';
import { Actions } from '@/components/employees-table/actions';

export function EmployeesTable() {
    const { isLoading, data } = useGetAllEmployeesQuery();
    
    const columns = [
        { key: 'firstName', label: 'First Name' },
        { key: 'age', label: 'Age' },
        { key: 'address', label: 'Address' },
        { key: 'actions', label: 'Actions' }
    ];
    
    return (
        <>
            <Table aria-label={ 'Employees Table' } key={ 'Employees table' }>
                <TableHeader columns={ columns }>
                    { ({ key, label }) =>
                        <TableColumn className={ 'uppercase text-small' } key={ key }>{ label }</TableColumn> }
                </TableHeader>
                { isLoading ? (
                    <TableBody>
                        <TableRow key={ 'loading' }>
                            { (columnKey) =>
                                <TableCell key={ columnKey }><Skeleton className={ 'h-4 w-5/6 rounded-md' } /></TableCell> }
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody items={ data } emptyContent={ 'No rows to display.' }>
                        { (employee: Employee) => (
                            <TableRow key={ employee.id }>
                                { (columnKey) => (
                                    <TableCell key={ columnKey }>
                                        { columnKey === 'actions' ?
                                            <Actions employeeData={ employee } /> : getKeyValue(employee, columnKey) }
                                    </TableCell>
                                ) }
                            </TableRow>
                        ) }
                    </TableBody>
                ) }
            </Table>
        </>
    );
}
