import { all, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as httpRequest from '../../utils/httpRequest';
import { IAction } from '../rootSaga';
import { logginSuccess, Login, SignUp, signupSuccess } from './userSlice';

function* SignIn({ payload }: IAction<Login>): any {
  try {
    const res = yield httpRequest.post('/user/login', payload);

    if (res) {
      toast.success('Welcome you back!');
      yield put(logginSuccess({ accessToken: res.token, user: res.data.user }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* signup({ payload }: IAction<SignUp>): any {
  try {
    const res = yield httpRequest.post('/user/signup', payload);

    if (res) {
      toast.success('Welcome to my website!');
      yield put(signupSuccess({ accessToken: res.token, user: res.data.user }));
    }
  } catch (error) {}
}
function* logout() {
  try {
    yield httpRequest.get('user/logout');
    toast.success('Logout Success!!');
  } catch (error: any) {
    console.log(error.message);
  }
}

function* onSignin() {
  yield takeLatest('user/logginStart', SignIn);
}

function* onSignUp() {
  yield takeLatest('user/signupStart', signup);
}

function* onLogout() {
  yield takeLatest('user/logout', logout);
}

function* userSaga() {
  yield all([call(onSignin), call(onSignUp)]);
}

export default userSaga;
