import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { api } from '@/shared/api/api';
import authSlice from '@/shared/lib/authSlice';
import employeesSlice from '@/shared/lib/employeesSlice';
import deleteEmployeeModalSlice from '@/shared/features/deleteEmployeeModalSlice';

import { authMiddleware } from '@/middleware/authMiddleware';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        authSlice,
        employeesSlice,
        deleteEmployeeModalSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware).prepend(authMiddleware.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;