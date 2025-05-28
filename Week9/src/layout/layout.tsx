import { Link, Outlet } from 'react-router-dom';

import Modal from '@/components/Modal';
import { ROUTES } from '@/constants/routes';

function Layout() {
  return (
    <div className="h-screen">
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-10 p-4 font-bold text-white bg-slate-500">
        <Link to={ROUTES.HOME}>🎵</Link>
        <Link to={ROUTES.CART}>장바구니</Link>
      </nav>

      <main className="flex-1 p-4 mt-10">
        <Outlet />
        <Modal />
      </main>
    </div>
  );
}

export default Layout;
