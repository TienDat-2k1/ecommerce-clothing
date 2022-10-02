import { apiSlice } from '../utils/baseQuery';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'user',
        method: 'POST',
        body: {
          ...credentials,
        },
      }),
    }),
  }),
});
