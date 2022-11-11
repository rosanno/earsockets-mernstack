import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const logOutApiSlice = createApi({
  reducerPath: 'logOutApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    logout: builder.query({
      query: () => 'logout/',
    }),
  }),
});

export const { useLazyLogoutQuery } = logOutApiSlice;
