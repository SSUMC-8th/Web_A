import { ShoppingCartIcon } from "lucide-react";
import { useDispatch, useSelector } from "../../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../../slices/cartSlice";

const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

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
