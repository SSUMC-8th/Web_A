import CartItems from "./CartItems";
import { useCartAction, useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

export default function CartList() {
  const { cartItems } = useCartInfo();
  const { clearCart } = useCartAction();

  const { isOpen, modalOpen, modalClose } = useModalStore();
  const handleRemove = () => {
    clearCart();
    modalClose();
  };
  return (
    <div>
      <ul>
        {cartItems.map((item) => {
          return <CartItems lp={item} key={item.id} />;
        })}
      </ul>
      <div className="mt-8 flex justify-center items-center ">
        <button
          className="w-fit border-1 p-3 rounded-2xl cursor-pointer"
          onClick={modalOpen}
        >
          전체 삭제
        </button>

        {/* 모달 */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] text-center">
              <p className="text-lg font-semibold mb-4">
                정말 삭제하시겠습니까?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm cursor-pointer"
                  onClick={modalClose}
                >
                  아니요
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
                  onClick={handleRemove}
                >
                  네
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
