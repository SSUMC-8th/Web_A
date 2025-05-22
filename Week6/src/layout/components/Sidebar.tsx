import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import Modal from '#/components/Modal';
import ROUTES from '#/constants/routes';

import { useDeleteUser } from '../../features/users/hooks/useDeleteUser';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isSidebarOpen, closeSidebar }: SidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const { mutate: deleteUser } = useDeleteUser();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        window.innerWidth < 1280
      ) {
        closeSidebar();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSidebar]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      ref={ref}
      className={clsx(
        'bg-white text-black w-64 p-4 transition-transform duration-300 fixed xl:relative h-full z-30 flex flex-col',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="h-20 text-xl font-bold">메뉴</div>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to={ROUTES.HOME}>홈</Link>
        </li>
        <li>
          <Link to={ROUTES.MYPAGE}>마이페이지</Link>
        </li>
      </ul>

      {/* 빈 공간 밀어내기 */}
      <div className="flex-1" />

      <button
        className="p-2 mb-4 text-sm text-white bg-red-600 rounded-md"
        onClick={openModal}
      >
        탈퇴하기
      </button>

      {isModalOpen && (
        <Modal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={deleteUser}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default Sidebar;
