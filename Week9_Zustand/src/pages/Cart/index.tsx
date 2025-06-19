import CartFooter from '@/pages/Cart/components/CartFooter';
import CartItem from '@/pages/Cart/components/CartItem';
import { useClearCart } from '@/pages/Cart/hooks/useClearCart';
import { cartStore } from '@/store/cartStore';

function Cart() {
  const cartItems = cartStore((state) => state.items);

  return (
    <div className="max-w-xl p-4 mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">장바구니</h2>
        <button
          onClick={useClearCart}
          className="p-2 text-white transition-transform duration-300 bg-red-500 rounded hover:bg-red-400"
        >
          비우기
        </button>
      </div>

      {cartItems.length === 0 && <h2>장바구니에 상품이 없습니다.</h2>}
      {cartItems.map((item) => (
        <CartItem item={item} />
      ))}

      <CartFooter />
    </div>
  );
}

export default Cart;
