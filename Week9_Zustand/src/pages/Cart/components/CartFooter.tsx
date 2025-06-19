import { cartStore } from '@/store/cartStore';

function CartFooter() {
  const totalPrice = cartStore((state) => state.total);

  return (
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
  );
}

export default CartFooter;
