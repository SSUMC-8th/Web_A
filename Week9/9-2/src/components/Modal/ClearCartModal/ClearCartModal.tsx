import { useCartActions } from "../../../hooks/useCartStore";
import { useModalAction, useModalInfo } from "../../../hooks/useModalStore";

const ClearCartModal = () => {
  const { isOpen } = useModalInfo();
  const { closeModal } = useModalAction();
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="mb-5 text-lg">정말 장바구니를 초기화하겠습니까?</p>
        <div className="flex justify-around">
          <button
            onClick={() => closeModal()}
            className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
          >
            아니요
          </button>
          <button
            onClick={() => {
              clearCart();
              closeModal();
            }}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearCartModal;
