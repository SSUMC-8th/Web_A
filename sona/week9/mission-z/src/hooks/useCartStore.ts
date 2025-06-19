import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItem";
// 액션 타입 정의
interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// 상태 + 액션
interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

// 스토어 생성
export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) =>
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) item.amount += 1;
        }),
      decrease: (id: string) =>
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item && item.amount > 0) item.amount -= 1;
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

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartAction = () => useCartStore((state) => state.actions);
