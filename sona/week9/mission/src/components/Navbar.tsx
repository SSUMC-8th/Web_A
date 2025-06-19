import { useEffect } from "react";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { calculateTotals } from "../slices/CartSlice";

export default function Navbar() {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

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
