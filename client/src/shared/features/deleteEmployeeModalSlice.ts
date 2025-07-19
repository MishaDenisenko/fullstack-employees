import { Employee } from '@/entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeleteEmployeeModalState {
    isOpen: boolean;
    employee: Employee | null;
}

const initialState: DeleteEmployeeModalState = {
    isOpen: false,
    employee: null
};

const deleteEmployeeModalSlice = createSlice({
    name: 'deleteEmployeeModal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Employee>) => {
            state.isOpen = true;
            state.employee = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.employee = null;
        }
    }
});

export const { openModal, closeModal } = deleteEmployeeModalSlice.actions;

export default deleteEmployeeModalSlice.reducer;