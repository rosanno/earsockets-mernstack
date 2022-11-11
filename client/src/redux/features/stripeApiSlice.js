import { authApi } from '../services/authApi';

export const stripeApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (cartItems) => ({
        url: 'stripe-checkout/create-checkout-session',
        method: 'POST',
        body: { ...cartItems },
      }),
    }),
  }),
});

export const { useCheckoutMutation } = stripeApiSlice;
