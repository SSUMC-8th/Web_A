import { useEffect } from "react";

import { useCartAction, useCartInfo } from "../hooks/useCartStore";

export default function Navbar() {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartAction();
  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="bg-gray-700  text-white text-2xl py-4 px-2 flex justify-between">
      <div className=" font-semibold">Suna Jeon</div>
      <div className="flex gap-1.5 items-center">
        <img src="/cart.svg" alt="" />
        <p className="text-xl">{amount}</p>
      </div>
    </div>
  );
}
