import { authApi } from '../services/authApi';

export const cartSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: 'cart/cart-items',
      }),
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: 'cart/',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteCartItem: builder.mutation({
      query: (productId) => ({
        url: `cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    increaseQuantity: builder.mutation({
      query: (data) => ({
        url: 'cart/increase-quantity',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Cart'],
    }),
    decreaseQuantity: builder.mutation({
      query: (data) => ({
        url: 'cart/decrease-quantity',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart/clearCart',
        method: 'PATCH',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useLazyGetCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useClearCartMutation,
} = cartSlice;
