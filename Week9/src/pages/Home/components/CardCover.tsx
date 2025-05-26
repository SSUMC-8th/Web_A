import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '@components/Modal';

import { ROUTES } from '@/constants/routes';

interface CardCoverProps {
  title: string;
  price: string;
  amount: number;
}

function CardCover({ title, price, amount }: CardCoverProps) {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const moveToCart = () => navigate(ROUTES.CART);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <div className="absolute inset-0 flex flex-col justify-end px-4 py-4 text-white transition-opacity duration-300 bg-black opacity-0 bg-opacity-60 group-hover:opacity-100">
      <h5 className="text-lg font-semibold">{title}</h5>
      <p className="text-sm">{price}</p>
      <p className="text-sm">남은 수량: {amount}</p>
      <button
        className="p-1 text-black bg-white rounded-xl"
        onClick={openModal}
      >
        장바구니 담기{' '}
      </button>

      {isOpenModal && (
        <Modal
          message={'장바구니로 이동하시겠습니까?'}
          onConfirm={moveToCart}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default CardCover;
