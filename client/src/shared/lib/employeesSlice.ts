import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '@/entities';
import { getAllEmployees } from '@/shared/api/employees';
import { RootState } from '@/shared/lib/store';

type TInitialState = {
    employees: Employee[] | null;
}

const initialState: TInitialState = {
    employees: null
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: builder => (
        builder
            .addMatcher(getAllEmployees.matchFulfilled, (state, action) => {
                state.employees = action.payload;
            })
    )
});

export const selectEmployees = (state: RootState) => state.employeesSlice.employees;

export default employeesSlice.reducer;
