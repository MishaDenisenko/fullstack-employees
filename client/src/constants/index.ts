export const BASE_URL_API: string = 'http://localhost:8000';

export const PATHS = {
    home: '/',
    employee: '/employees',
    employeeAdd: '/employees/add',
    employeeEdit: '/employees/edit',
    status: '/status',
    login: '/auth/login',
    register: '/auth/register'
} as const;