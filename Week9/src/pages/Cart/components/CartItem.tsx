import { decrease, increase, removeItem } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import type { CartItem } from '@/types/CartItem';

interface CartItemProps {
  item: CartItem;
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div
      key={item.id}
      className="flex items-center justify-between gap-4 pb-4 border-b"
    >
      <img
        src={item.img}
        alt={item.title}
        className="object-cover w-16 h-16 rounded"
      />

      <div className="flex-1">
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-gray-500">{item.singer}</div>
        <div className="mt-1 font-semibold">
          ${Number(item.price).toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <button onClick={() => dispatch(removeItem(item.id))}>삭제</button>
        <div className="flex items-center px-2 py-1 border rounded">
          <button
            className="px-2 text-xl"
            onClick={() => dispatch(decrease(item.id))}
          >
            -
          </button>
          <span className="px-2">{item.amount}</span>
          <button
            className="px-2 text-xl"
            onClick={() => dispatch(increase(item.id))}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
