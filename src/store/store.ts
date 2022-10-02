import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import userSlice from './user/userSlice';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: { cart: cartSlice, user: userSlice },
  middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
