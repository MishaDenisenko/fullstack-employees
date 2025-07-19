import { api } from '@/shared/api/api';
import { Employee } from '@/entities';

export const employeesApi = api.injectEndpoints({
    endpoints: build => ({
        getAllEmployees: build.query<Employee[], void>({
            query: () => ({
                url: '/employees',
                method: 'GET'
            })
        }),
        getEmployeeById: build.query<Employee, string>({
            query: id => ({
                url: `/employees/${ id }`,
                method: 'GET'
            })
        }),
        addEmployee: build.mutation<Employee, Employee>({
            query: employee => ({
                url: '/employees/add',
                method: 'POST',
                body: employee
            })
        }),
        editEmployee: build.mutation<string, Employee>({
            query: employee => ({
                url: `/employees/edit/${ employee.id }`,
                method: 'PUT',
                body: employee
            })
        }),
        removeEmployee: build.mutation<string, string>({
            query: id => ({
                url: `/employees/remove/${ id }`,
                method: 'DELETE',
                body: id
            })
        })
    })
});

export const {
    useGetAllEmployeesQuery,
    useGetEmployeeByIdQuery,
    useAddEmployeeMutation,
    useEditEmployeeMutation,
    useRemoveEmployeeMutation
} = employeesApi;

export const { getAllEmployees, getEmployeeById, addEmployee, editEmployee, removeEmployee } = employeesApi.endpoints;