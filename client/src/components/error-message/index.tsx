import { Alert } from '@heroui/alert';

export function ErrorMessage({ message }: { message: string }) {
    return (
        <Alert color={ 'danger' } description={ message } />
    );
}
