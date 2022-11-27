import { apiSlice } from '../../utils/baseQuery';
import { CategoryModel } from '../../utils/types';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCategory: builder.query<any, void>({
      query: () => 'categories',
      transformResponse: (
        data: {
          data: { data: CategoryModel[] };
          results: number;
          totalPages: number;
        },
        meta
      ) => {
        const {
          data: { data: results },
          results: totalResults,
          totalPages,
        } = data;

        return { results, totalResults, totalPages };
      },
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApiSlice;
