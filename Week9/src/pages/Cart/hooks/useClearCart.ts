import { clearCart } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { closeModal, openModal } from '@/store/modalSlice';

const dispatch = useAppDispatch();

export const useClearCart = () => {
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
