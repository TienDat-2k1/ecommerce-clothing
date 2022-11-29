import { apiSlice } from '../../utils/baseQuery';
import { OrderModel } from '../../utils/types';

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOrder: builder.query<OrderModel, string | undefined>({
      query: id => {
        return {
          url: `/orders/${id}`,
        };
      },
      transformResponse: (res: any, meta) => {
        return res.data.data;
      },
    }),
  }),
});

export const { useGetOrderQuery } = orderApiSlice;
