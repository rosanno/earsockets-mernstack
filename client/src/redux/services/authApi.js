import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../features/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      console.log('sending refresh token');
      try {
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);

        if (refreshResult?.data) {
          const user = api.getState().auth.user;
          api.dispatch(setCredentials({ ...refreshResult.data, user }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart', 'Order'],
  endpoints: (builder) => ({}),
});
