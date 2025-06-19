import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartItem } from '@/types/CartItem';

interface CartState {
  items: CartItem[];
  total: number;
}

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, cur) => acc + Number(cur.price) * cur.amount, 0);

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const target = state.items.find((i) => i.id === action.payload.id);
      if (target) {
        target.amount += 1;
      } else {
        state.items.push({ ...action.payload, amount: 1 });
      }
      state.total = calculateTotal(state.items);
    },
    increase: (state, action: PayloadAction<string>) => {
      const target = state.items.find((i) => i.id === action.payload);
      if (target) {
        target.amount += 1;
        state.total = calculateTotal(state.items);
      }
    },
    decrease: (state, action: PayloadAction<string>) => {
      const target = state.items.find((i) => i.id === action.payload);
      if (target && target.amount > 1) {
        target.amount -= 1;
        state.total = calculateTotal(state.items);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.total = calculateTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, increase, decrease, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
