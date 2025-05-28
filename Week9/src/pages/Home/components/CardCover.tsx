import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { addItem } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { closeModal, openModal } from '@/store/modalSlice';
import { CartItem } from '@/types/CartItem';

interface CardCoverProps {
  cart: CartItem;
}

function CardCover({ cart }: CardCoverProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(addItem(cart));
    dispatch(
      openModal({
        message: '장바구니로 이동하시겠습니까?',
        onConfirm: () => {
          dispatch(closeModal());
          navigate(ROUTES.CART);
        },
      }),
    );
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-end px-4 py-4 text-white transition-opacity duration-300 bg-black opacity-0 bg-opacity-60 group-hover:opacity-100">
      <h5 className="text-lg font-semibold">{cart.title}</h5>
      <p className="text-sm">{cart.price}</p>
      <p className="text-sm">남은 수량: {cart.amount}</p>
      <button
        className="p-1 text-black bg-white rounded-xl"
        onClick={handleClick}
      >
        장바구니 담기
      </button>
    </div>
  );
}

export default CardCover;
