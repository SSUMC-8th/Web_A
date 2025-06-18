import type { CartItems } from "../../types/cart";

export interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;

  actions: CartActions;
}
