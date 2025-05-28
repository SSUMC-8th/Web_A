import type { CartItems } from "../../types/cart";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}
