import { cartSlice } from "../slices/cartSlice";
import type { Lp } from "../types/Lp";
import { useAppDispatch } from "../hooks/useCustomRedux";

interface CardProps {
  lp: Lp;
}
const Card = ({ lp }: CardProps) => {
  const dispatch = useAppDispatch();
  const { increment, decrement, removeItem, calculateTotal } =
    cartSlice.actions;

  return (
    <div>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={lp.img}
            alt={lp.title}
            className="w-32 h-32 rounded-3xl m-2"
          />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold break-words w-100">
              {lp.title}
            </p>
            <p className="text-sm text-gray-600 font-semibold">{lp.singer}</p>
            <p className="text-sm text-gray-600 font-semibold">{lp.price}원</p>
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            className="px-3 py-1 bg-gray-400 rounded-l hover:bg-gray-500 cursor-pointer"
            onClick={() => {
              if (lp.amount <= 1) {
                dispatch(removeItem({ id: lp.id }));
              } else {
                dispatch(decrement({ id: lp.id }));
              }
              dispatch(calculateTotal());
            }}
          >
            -
          </button>

          <p className="text-xl px-3 py-1 border-y  border-gray-400 ">
            {lp.amount}
          </p>
          <button
            type="button"
            className="px-3 py-1 bg-gray-400 rounded-r hover:bg-gray-500 cursor-pointer"
            onClick={() => {
              dispatch(increment({ id: lp.id }));
              dispatch(calculateTotal());
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
