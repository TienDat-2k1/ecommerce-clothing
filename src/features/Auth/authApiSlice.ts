import store from '../../store/store';
import { logginSuccess, signupSuccess } from '../../store/user/userSlice';
import { apiSlice } from '../../utils/baseQuery';
import { SignUp, UserModel } from '../../utils/types';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    refresh: builder.query<any, void>({
      query: () => ({ url: '/user/refresh' }),
      transformResponse: (result: any, meta) => {
        if (result.status === 'success') {
          const {
            token: accessToken,
            data: { user },
          } = result;

          store.dispatch(logginSuccess({ accessToken, user }));
        }
        return result;
      },
    }),
    login: builder.mutation({
      query: (credential: { email: string; password: string }) => ({
        url: '/user/login',
        method: 'POST',
        body: { ...credential },
      }),
      transformResponse: (result: any, meta) => {
        if (result.status === 'success') {
          const {
            token: accessToken,
            data: { user },
          } = result;

          store.dispatch(logginSuccess({ accessToken, user }));
        }
        return result;
      },
    }),
    signup: builder.mutation({
      query: (credential: SignUp) => ({
        url: '/user/signup',
        method: 'POST',
        body: { ...credential },
      }),
      transformResponse: (result: any, meta) => {
        if (result.status === 'success' && meta?.response?.status === 200) {
          const {
            token: accessToken,
            data: { user },
          } = result;

          store.dispatch(signupSuccess({ accessToken, user }));
        }

        return result;
      },
    }),
    getMe: builder.query<UserModel, void>({
      query: () => '/user/me',
      transformResponse: (res: any, meta) => {
        const data = res.data?.data;
        return data;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshQuery,
  useSignupMutation,
  useGetMeQuery,
} = authApiSlice;
