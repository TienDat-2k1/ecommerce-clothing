// import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import userSlice from './user/userSlice';
// import rootSaga from './rootSaga';
import searchSlice from './search/searchSlice';
import { apiSlice } from '../utils/baseQuery';

// const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    search: searchSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
