import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `/auth/get-user`,
                method: 'GET',
                params: { id }
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/auth/change-password`,
                method: 'PATCH',
                body: data
            })
        }),
        forgetPassword: builder.mutation({
            query: (data) => ({
                url: `/auth/verify-email`,
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `/auth/reset-password`,
                method: 'POST',
                body: data
            })
        }),
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useChangePasswordMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation
} = authApi;