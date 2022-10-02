import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

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
  user: User;
  error?: string;
};

const initialState: UserState = {
  isLogged: false,
  isLoading: false,
  accessToken: '',
  error: undefined,
  user: {
    role: 'user',
  } as User,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logginStart: (state, actions: PayloadAction<Login>) => {
      state.error = undefined;
      state.isLoading = true;
    },
    logginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
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
      action: PayloadAction<{ accessToken: string; user: User }>
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
      state.user = {} as User;
      state.error = undefined;
      state.isLogged = false;
    },
  },
});

export const {
  logginStart,
  logginSuccess,
  signupStart,
  signupSuccess,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
