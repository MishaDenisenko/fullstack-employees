import { api } from '@/shared/api/api';
import { User } from '@/entities';

export type TUserRegisterData = Omit<User, 'id'>;
export type TUserLoginData = Omit<TUserRegisterData, 'name'>;
export type TUserResponse = User & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<TUserResponse, Omit<TUserLoginData, 'name'>>({
            query: userData => ({
                url: '/auth/login',
                method: 'POST',
                body: userData
            })
        }),
        register: build.mutation<TUserResponse, TUserRegisterData>({
            query: userData => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            })
        }),
        current: build.query<TUserResponse, void>({
            query: () => ({
                url: '/auth/current',
                method: 'GET'
            })
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi;
export const { login, register, current } = authApi.endpoints;