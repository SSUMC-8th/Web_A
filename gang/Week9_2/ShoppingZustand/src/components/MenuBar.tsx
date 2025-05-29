import { ShoppingCart } from "lucide-react";
import { useBoundStore } from "../store/store";

function MenuBar() {
  const totalAmount = useBoundStore((state) => state.amount);
  return (
    <div className="flex h-20 w-full justify-between items-center bg-blue-600">
      <h1 className="text-3xl text-white font-bold p-2 ">Gang</h1>
      <div className="flex items-center">
        <ShoppingCart className="size-10 text-white" />
        <span className="text-2xl font-bold text-white mx-2">
          {totalAmount}
        </span>
      </div>
    </div>
  );
}

export default MenuBar;
