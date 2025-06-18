import { ShoppingCartIcon } from "lucide-react";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-2x font-semibold cursor-pointer"
      >
        Jett LpCart
      </h1>
      <div className="flex items-center space-x-2">
        <ShoppingCartIcon className="text-2xl" />
        <span className="text-xt font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
