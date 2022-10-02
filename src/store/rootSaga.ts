import { all, call } from 'redux-saga/effects';
import userSaga from './user/userSaga';

export interface IAction<T> {
  type: string;
  payload: T;
}

function* rootSaga() {
  yield all([call(userSaga)]);
}

export default rootSaga;
