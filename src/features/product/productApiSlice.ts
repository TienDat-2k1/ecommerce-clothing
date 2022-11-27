import { apiSlice } from '../../utils/baseQuery';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllProduct: builder.query<any, {}>({
      query: params => {
        console.log(params);
        return {
          url: '/products/',
          params,
        };
      },
    }),
  }),
});

export const { useGetAllProductQuery } = productApiSlice;
