import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItem";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

//cartSlice생성
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount += 1;
      }
    },
    // ↓ 추가할 예정인 함수들에 대한 TODO 메모

    // decrease
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount -= 1;
      }
    },

    // removeItem
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== itemId
      );
    },

    // clearCart
    clearCart: (state) => {
      state.cartItems = [];
    },

    // calculateTotals
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, calculateTotals, clearCart } =
  cartSlice.actions;
//duck pattern , reducer는 export default로 내보내야함
const cartReducer = cartSlice.reducer;
export default cartReducer;
