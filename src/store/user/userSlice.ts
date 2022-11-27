import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../utils/types';

export type Login = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
};

type UserState = {
  isLogged: boolean;
  isLoading: boolean;
  accessToken: string;
  user: UserModel;
  error?: string;
};

const initialState: UserState = {
  isLogged: false,
  isLoading: false,
  accessToken: '',
  error: undefined,
  user: {} as UserModel,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; user: UserModel }>
    ) => {
      state.error = undefined;
      state.isLoading = false;
      state.isLogged = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    signupStart: (state, action: PayloadAction<SignUp>) => {
      state.error = undefined;
      state.isLoading = true;
    },
    signupSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; user: UserModel }>
    ) => {
      state.error = undefined;
      state.isLoading = false;
      state.isLogged = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: state => {
      state.accessToken = '';
      state.isLoading = false;
      state.user = {} as UserModel;
      state.error = undefined;
      state.isLogged = false;
    },
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
  },
});

export const { logginSuccess, signupStart, signupSuccess, logout, setUser } =
  userSlice.actions;

export default userSlice.reducer;
