import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'product/all-product',
    }),
    getProduct: builder.query({
      query: (slug) => `product/${slug}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
