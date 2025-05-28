import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { CartItem } from '@/types/CartItem';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, cur) => acc + Number(cur.price) * cur.amount, 0);

export const cartStore = create<CartState>()(
  immer((set) => ({
    items: [],
    total: 0,

    addItem: (item) =>
      set((state) => {
        const target = state.items.find((i) => i.id === item.id);
        if (target) {
          target.amount += 1;
        } else {
          state.items.push({ ...item, amount: 1 });
        }
        state.total = calculateTotal(state.items);
      }),

    increase: (id) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          item.amount += 1;
          state.total = calculateTotal(state.items);
        }
      }),

    decrease: (id) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item && item.amount > 1) {
          item.amount -= 1;
          state.total = calculateTotal(state.items);
        }
      }),

    removeItem: (id) =>
      set((state) => {
        state.items = state.items.filter((i) => i.id !== id);
        state.total = calculateTotal(state.items);
      }),

    clearCart: () =>
      set((state) => {
        state.items = [];
        state.total = 0;
      }),
  })),
);
