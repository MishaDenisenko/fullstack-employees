import { Spinner } from '@heroui/spinner';

function Loading() {
    return (
        <div className={ 'h-full w-full' }>
            <Spinner className={ 'absolute top-1/3 left-1/2' } size='lg' />
        </div>
    );
}

export default Loading;