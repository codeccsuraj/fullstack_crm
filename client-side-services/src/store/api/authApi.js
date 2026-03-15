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
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery
} = authApi;