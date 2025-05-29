import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "../hooks/useCustomRedux";

function MenuBar() {
  const totalAmount = useAppSelector((state) => state.cart.amount)
  return (
    <div className="flex h-20 w-full justify-between items-center bg-blue-600">
      <h1 className="text-3xl text-white font-bold p-2 ">Gang</h1>
      <div className="flex items-center">
        <ShoppingCart className="size-10 text-white" />
        <span className="text-2xl font-bold text-white mx-2">{totalAmount}</span>
      </div>
    </div>
  );
}

export default MenuBar;
