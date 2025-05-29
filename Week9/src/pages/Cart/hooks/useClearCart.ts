import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slice/cartSlice';
import { closeModal, openModal } from '@/store/slice/modalSlice';

export const useClearCart = () => {
  const dispatch = useAppDispatch();

  return () => {
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
};
