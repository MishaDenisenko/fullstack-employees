import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API as baseUrl } from '@/constants';

import { RootState } from '@/shared/lib/store';

export const baseApi = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).authSlice.user?.token || localStorage.getItem('token');
        token && headers.set('Authorization', `Bearer ${ token }`);
    }
});

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: retry(baseApi, { maxRetries: 1 }),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
});