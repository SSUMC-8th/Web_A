import { clearCart, decrease, increase, removeItem } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal, openModal } from '@/store/modalSlice';

function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.total);

  const handleClearCart = () => {
    dispatch(
      openModal({
        message: '정말 삭제하시겠습니까?',
        onConfirm: () => {
          dispatch(clearCart());
          dispatch(closeModal());
        },
      }),
    );
  };

  return (
    <div className="max-w-xl p-4 mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">장바구니</h2>
        <button
          onClick={handleClearCart}
          className="p-2 text-white transition-transform duration-300 bg-red-500 rounded hover:bg-red-400"
        >
          비우기
        </button>
      </div>

      {cartItems.map((item) => (
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
      ))}

      <div className="flex items-center">
        <div className="flex-1 text-lg font-bold text-right">
          총합: ${totalPrice.toLocaleString()}
        </div>
        <button
          onClick={() => alert('주문완료')}
          className="p-2 ml-2 font-semibold text-white transition-transform duration-300 bg-blue-500 rounded hover:bg-blue-400"
        >
          주문하기
        </button>
      </div>
    </div>
  );
}

export default Cart;
