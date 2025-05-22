import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ROUTES from '#/constants/routes';
import { useDeleteLp } from '#/features/lps/hooks/useDeleteLp';
import { LpItem } from '#/types/lps';

function useLpDelete(lp: LpItem) {
  const navigate = useNavigate();
  const { mutate: deleteLp } = useDeleteLp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = () => {
    deleteLp(lp.id, {
      onSuccess: () => navigate(ROUTES.HOME),
    });
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    confirmDelete,
  };
}

export default useLpDelete;
