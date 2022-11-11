import { authApi } from '../services/authApi';

export const orderApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: 'orders/',
      }),
      providesTags: ['Order'],
    }),
    postOrder: builder.mutation({
      query: () => ({
        url: 'orders/',
        method: 'POST',
      }),
      invalidatesTags: ['Order'],
    }),
    removeOrder: builder.mutation({
      query: (productId) => ({
        url: 'orders/',
        method: 'DELETE',
        body: { productId },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrderQuery,
  usePostOrderMutation,
  useRemoveOrderMutation,
} = orderApiSlice;
