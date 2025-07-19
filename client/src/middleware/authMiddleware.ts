import { createListenerMiddleware } from '@reduxjs/toolkit';
import { login, register } from '@/shared/api/auth';

export const authMiddleware = createListenerMiddleware();

// authMiddleware.startListening({
//     matcher: action => login.matchFulfilled(action) || register.matchFulfilled(action),
//     effect: async (action, api) => {
//         const { token } = action.payload;
//
//         api.cancelActiveListeners();
//         token && localStorage.setItem('token', token);
//     }
// })

authMiddleware.startListening({
    matcher: login.matchFulfilled,
    effect: async (action, api) => {
        const { token } = action.payload;

        api.cancelActiveListeners();
        token && localStorage.setItem('token', token);
    }
});

authMiddleware.startListening({
    matcher: register.matchFulfilled,
    effect: async (action, api) => {
        const { token } = action.payload;
        api.cancelActiveListeners();
        token && localStorage.setItem('token', token);
    }
});

