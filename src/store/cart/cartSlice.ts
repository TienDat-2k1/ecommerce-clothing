import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartModel } from '../../Model/cartModel';
import { RootState } from '../store';

type CartState = {
  cart: CartModel[];
  totalPrice: number;
  totalItem: number;
};

const updateTotalPrice = (state: CartState) => {
  return state.cart.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);
};

const updateTotalItem = (state: CartState) => {
  return state.cart.reduce((acc, curr) => {
    return (acc += curr.quantity);
  }, 0);
};

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalItem: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartModel>) => {
      const existingItem = state.cart.find(
        item =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (existingItem) {
        state.cart = state.cart.map(item =>
          item._id === existingItem._id && item.size === existingItem.size
            ? {
                ...item,
                quantity: existingItem.quantity + action.payload.quantity,
              }
            : item
        );
      } else {
        state.cart.push(action.payload);
      }

      // update total price and item
      state.totalPrice = updateTotalPrice(state);
      state.totalItem = updateTotalItem(state);
    },
    removeItemCart: (state, action: PayloadAction<CartModel>) => {
      const existingItem = state.cart.find(
        item =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (existingItem && existingItem.quantity > 1) {
        state.cart = state.cart.map(item =>
          item._id === existingItem._id && item.size === existingItem.size
            ? { ...item, quantity: existingItem.quantity - 1 }
            : item
        );
      } else {
        state.cart = state.cart.filter(
          item =>
            !(
              item._id === action.payload._id &&
              item.size === action.payload.size
            )
        );
      }

      // update total price and item
      state.totalPrice = updateTotalPrice(state);
      state.totalItem = updateTotalItem(state);
    },
    removeFromCart: (state, action: PayloadAction<CartModel>) => {
      state.cart = state.cart.filter(
        item =>
          !(
            item._id === action.payload._id && item.size === action.payload.size
          )
      );

      // update total price and item
      state.totalPrice = updateTotalPrice(state);
      state.totalItem = updateTotalItem(state);
    },
  },
});

export const { addCart, removeItemCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
