import { cartStore } from '@/store/cartStore';
import { modalStore } from '@/store/modalStore';

export const useClearCart = () => {
  const { clearCart } = cartStore.getState(); // 액션 직접 꺼냄
  const { openModal, closeModal } = modalStore.getState();

  openModal({
    message: '정말 삭제하시겠습니까?',
    onConfirm: () => {
      clearCart();
      closeModal();
    },
  });
};
