import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    timeout: 5000,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Auth', 'Product', 'Cart', 'Order', 'Admin', 'Recommendation'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['Auth', 'Cart']
    }),
    register: builder.mutation({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      invalidatesTags: ['Auth']
    }),
    me: builder.query({ query: () => '/auth/me', providesTags: ['Auth'] }),
    products: builder.query({
      query: (params) => ({ url: '/products', params }),
      providesTags: ['Product']
    }),
    product: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: 'Product', id: slug }]
    }),
    recommendations: builder.query({
      query: () => '/recommendations',
      providesTags: ['Recommendation']
    }),
    cart: builder.query({ query: () => '/cart', providesTags: ['Cart'] }),
    updateCart: builder.mutation({
      query: (body) => ({ url: '/cart', method: 'PUT', body }),
      invalidatesTags: ['Cart']
    }),
    applyCoupon: builder.mutation({
      query: (body) => ({ url: '/cart/coupon', method: 'POST', body }),
      invalidatesTags: ['Cart']
    }),
    createOrder: builder.mutation({
      query: (body) => ({ url: '/orders', method: 'POST', body }),
      invalidatesTags: ['Order', 'Cart']
    }),
    adminAnalytics: builder.query({ query: () => '/admin/analytics', providesTags: ['Admin'] })
    ,
    createProduct: builder.mutation({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: ['Product', 'Admin']
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/products/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Product', 'Admin']
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useProductsQuery,
  useProductQuery,
  useRecommendationsQuery,
  useCartQuery,
  useUpdateCartMutation,
  useApplyCouponMutation,
  useCreateOrderMutation,
  useAdminAnalyticsQuery,
  useCreateProductMutation,
  useUpdateProductMutation
} = api;
