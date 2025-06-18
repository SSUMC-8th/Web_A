import { immer } from "zustand/middleware/immer";
import type { CartState } from "./cartStore.types";
import { create } from "zustand";
import cartItems from "../../constants/cartItems";

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) =>
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem) {
            cartItem.amount += 1;
          }
        }),
      decrease: (id: string) =>
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        }),
      removeItem: (id: string) =>
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }),
      clearCart: () =>
        set((state) => {
          state.cartItems = [];
        }),
      calculateTotals: () =>
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
          });

          state.amount = amount;
          state.total = total;
        }),
    },
  }))
);
