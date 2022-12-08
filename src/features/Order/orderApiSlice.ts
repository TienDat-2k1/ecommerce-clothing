import { apiSlice } from '../../utils/baseQuery';
import { OrderModel } from '../../utils/types';

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateOrder: builder.mutation<
      OrderModel,
      Partial<OrderModel> & { id: string }
    >({
      query: ({ id, ...data }) => {
        return {
          url: `/orders/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      transformResponse: (res: any, meta) => {
        console.log(res);
        return res;
      },
      invalidatesTags: ['Order'],
    }),
    getOrders: builder.query<OrderModel[], {}>({
      query: (options: {}) => {
        return {
          url: '/orders',
          params: options,
        };
      },
      transformResponse: (res: any, meta) => {
        return res.data?.data || [];
      },
    }),
    getOrder: builder.query<OrderModel, string | undefined>({
      query: id => {
        return {
          url: `/orders/${id}`,
        };
      },
      transformResponse: (res: any, meta) => {
        return res.data.data;
      },
      providesTags: ['Order'],
    }),
  }),
});

export const { useGetOrderQuery, useGetOrdersQuery, useUpdateOrderMutation } =
  orderApiSlice;
