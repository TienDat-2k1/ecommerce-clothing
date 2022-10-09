import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const cartReducer = (state: RootState) => state.cart;

export const cartItemsSelector = createSelector(
  [cartReducer],
  cart => cart.cart
);

export const cartTotalPriceSelector = createSelector(
  [cartReducer],
  cart => cart.totalPrice
);

export const cartTotalItemSelector = createSelector(
  [cartReducer],
  cart => cart.totalItem
);
