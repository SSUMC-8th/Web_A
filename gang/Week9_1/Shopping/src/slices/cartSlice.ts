import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cardItems";
import type { CartItems } from "../types/Lp";

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 12,
  total: 276000,
};

//cartSlice 생성
//react toolkit에서 사용하는 createSlice 사용
//Immer 라이브러리를 자체적으로 사용하여 사본을 따로 만들어서 전달할 필요x 
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //action: 상태 변경에 사용할 외부 데이터가 필요한 경우 사용, dispatch 에서 전달받은 데이터를 보유함
    increment: (state, action: PayloadAction<{id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount += 1;
      }
    },
    decrement: (state, action: PayloadAction<{id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount -= 1;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    clearAll: (state) => {
      state.amount = 0;
      state.total = 0;
      state.cartItems = [];
    },
    calculateTotal: (state) => {
      let totalPrice = 0;
      let totalAmount = 0;
      state.cartItems.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += parseInt(item.price) * item.amount;
      });
      state.amount = totalAmount;
      state.total = totalPrice;
    },
  },
});


export const {increment, decrement, removeItem, clearAll, calculateTotal} = cartSlice.actions;
//duck pattern 활용. reducer은 export default로 내보내야 한다.
const cartReducer = cartSlice.reducer;

export default cartReducer;
