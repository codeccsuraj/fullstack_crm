import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
        const session = localStorage.getItem("session");

        if (session) {
            const token = JSON.parse(session).token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }

        return headers
    }
});

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ["Auth", "User"],
    endpoints: () => ({})
});