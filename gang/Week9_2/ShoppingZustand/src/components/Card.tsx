import { useBoundStore } from "../store/store";
import type { Lp } from "../types/LP";

interface CardProps {
  lp: Lp;
}
const Card = ({ lp }: CardProps) => {
  //const { increment, decrement, removeItem, calculateTotal } = useStore();
  //별도로 꺼내주어 과도한 리렌더링 방지
  const increment = useBoundStore((state) => state.increment);
  const decrement = useBoundStore((state) => state.decrement);
  const removeItem = useBoundStore((state) => state.removeItem);
  const calculateTotal = useBoundStore((state) => state.calculateTotal);

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
                removeItem(lp);
              } else {
                decrement(lp);
              }
              calculateTotal();
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
              increment(lp);
              calculateTotal();
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
