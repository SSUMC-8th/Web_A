import { type StateCreator } from "zustand";
import type { CartItems, Lp } from "../types/LP";
import cartItems from "../constants/cartItems";
import type { BoundStore } from "../store/store";

export interface ICartState {
  amount: number;
  total: number;
  cartItems: CartItems;
  }
export interface ICartActions {
  increment: (item: Lp) => void;
  decrement: (item: Lp) => void;
  clearAll: () => void;
  removeItem: (item: Lp) => void;
  calculateTotal: () => void;
}

export type CartSlice = ICartState & ICartActions;

//immer 사용(immer 사용 시 직접 수정만 가능하다)
//주석: 사본 전달 방법
const createCartSlice: StateCreator<
  BoundStore,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  CartSlice
> = (set) => ({
  amount: 12,
  total: 276000,
  cartItems: cartItems,

  increment: (item: Lp) => {
    set((state) => {
      //   const increasedItems = state.cartItems.map((lp:Lp) =>
      //     lp.id === item.id ? { ...lp, amount: lp.amount + 1 } : lp
      //   );
      //   return {
      //     cartItems: increasedItems,
      //     amount:state.amount + 1;,
      //   };
      const target = state.cartItems.find((lp: Lp) => lp.id === item.id);
      if (target) {
        target.amount += 1;
        state.amount += 1;
      }
    },false, 'increment');
  },
  decrement: (item: Lp) => {
    set((state) => {
      //   const increasedItems = state.cartItems.find((lp: Lp) =>
      //     lp.id === item.id ? { ...lp, amount: lp.amount - 1 } : lp
      //   );
      //   return {
      //     cartItems: increasedItems,
      //     amount: state.amount - 1,
      //   };
      const target = state.cartItems.find((lp: Lp) => lp.id === item.id);
      if (target) {
        target.amount -= 1;
        state.amount -= 1;
      }
    },false, 'decrement');
  },
  removeItem: (item: Lp) => {
    set((state) => {
      //   const removedCart = state.cartItems.filter((lp: Lp) => lp.id !== item.id);
      //   return {
      //     cartItems: removedCart,
      //   };
      state.cartItems=state.cartItems.filter((lp: Lp) => lp.id !== item.id);
    },false, 'removeItem');
  },
  clearAll: () => {
    set((state) => {
      //   return {
      //     cartItems: [],
      //     amount: 0,
      //     total: 0,
      //   };
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },false, 'clearAll');
  },
  calculateTotal: () => {
    set((state) => {
      //   let totalPrice = 0;
      //   let totalAmount = 0;
      //   state.cartItems.forEach((lp: Lp) => {
      //     totalPrice += lp.amount * parseInt(lp.price);
      //     totalAmount += lp.amount;
      //   });
      //   return {
      //     amount: totalAmount,
      //     total: totalPrice,
      //   };

      let totalPrice = 0;
      let totalAmount = 0;
      state.cartItems.forEach((lp: Lp) => {
        totalPrice += lp.amount * parseInt(lp.price);
        totalAmount += lp.amount;
      });
      state.amount = totalAmount;
      state.total = totalPrice;
    },false, 'calculateTotal');
  },
});

export default createCartSlice;
