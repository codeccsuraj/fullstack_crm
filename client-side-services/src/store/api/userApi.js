import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data) => ({
                url: '/user/create',
                method: 'POST',
                body: data
            }),
            providesTags: ['User']
        }),
        getUserByAuthId: builder.query({
            query: (id) => ({
                url: `/user/get-user`,
                method: 'GET',
                params: { id }
            }),
            invalidatesTags: ['User']
        }),
    })
});

export const {
    useAddUserMutation,
    useGetUserByAuthIdQuery,
} = userApi;