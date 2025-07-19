import { createSlice } from '@reduxjs/toolkit';
import { current, login, register, TUserResponse } from '@/shared/api/auth';
import { RootState } from '@/shared/lib/store';

type TInitialState = {
    user: TUserResponse | null,
    isAuthenticated: boolean,
}

const initialState: TInitialState = {
    user: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('token');
            return initialState;
        }
    },
    extraReducers: builder => (
        builder
            .addMatcher(login.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addMatcher(register.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addMatcher(current.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
    )
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.authSlice.isAuthenticated;
export const selectUser = (state: RootState) => state.authSlice.user;

export default authSlice.reducer;
