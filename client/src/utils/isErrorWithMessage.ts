export const isErrorWithMessage = (err: unknown): err is ErrorWithMessage => {
    return (
        typeof err === 'object' &&
        err !== null &&
        'data' in err &&
        typeof (err as Record<string, unknown>).data === 'object'
    );
};

export type ErrorWithMessage = {
    status: number,
    data: {
        message: string
    }
}