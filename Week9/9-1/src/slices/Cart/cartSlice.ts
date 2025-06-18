import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";
import type { CartState } from "./cartSlice.types";

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

// cartSlice 생성
// createSlice -> reduxToolkit에서 제공

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ToDo : 증가
    // state는 이 slice가 관리하는 현재 상태값을 의미
    // action은 리듀서를 호출할 때 넘겨주는 정보(payload)를 담고 있는 객체
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount += 1;

        // 참고: Redux Toolkit은 내부적으로 immer를 사용하기 때문에 state를 직접 수정하는 것처럼 써도 실제로는 immutable하게 동작
      }
    },

    // ToDo : 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },

    // ToDo : removeItem
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== itemId
      );
    },

    // 만약 useState 였다면 ?
    // setCartItem((prev) => prev.filter((item) => item.id !== itemId));
    // 이런 식으로 작성 했을 거..

    // TodDo : clearCart
    clearCart: (state) => {
      state.cartItems = [];
    },

    // ToDo : 총액 계산
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

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

// duck pattern -> reducer는 export default로 내보내야 함.
const cartReducer = cartSlice.reducer;

export default cartReducer;
