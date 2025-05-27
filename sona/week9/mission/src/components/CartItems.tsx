import { useDispatch } from "../hooks/useCustomRedux";
import { decrease, increase, removeItem } from "../slices/CartSlice";
import type { Lp } from "../types/cart";

interface CartItemsProps {
  lp: Lp;
}

export default function CartItems({ lp }: CartItemsProps) {
  // console.log(lp);
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(increase({ id: lp.id }));
  };
  const handleDecrease = () => {
    if (lp.amount === 0) {
      dispatch(removeItem({ id: lp.id }));
    } else {
      dispatch(decrease({ id: lp.id }));
    }
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-1 py-3 border-gray-300 ">
        <div className="flex gap-3">
          <img src={lp.img} alt="" className="size-20 rounded-xl" />
          <div>
            <p className="font-semibold">{lp.title}</p>
            <p>{lp.singer}</p>
            <p className="font-semibold">${lp.price}원</p>
          </div>
        </div>
        <div className="flex  items-center ">
          <button
            className="bg-gray-200 px-3 rounded-sm border-gray-400 cursor-pointer hover:bg-gray-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <button className="border-gray-200 border-1 px-3 rounded-sm  cursor-pointer hover:bg-gray-300">
            {lp.amount}
          </button>
          <button
            onClick={handleAdd}
            className=" bg-gray-200  px-3 rounded-sm cursor-pointer hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
