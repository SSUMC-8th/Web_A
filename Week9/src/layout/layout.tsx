import { Link, Outlet } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

function Layout() {
  return (
    <div className="h-screen">
      <nav className="flex items-center justify-between h-10 p-3 font-bold text-white bg-slate-500">
        <Link to={ROUTES.HOME}>🎵</Link>
        <Link to={ROUTES.CART}>장바구니</Link>
      </nav>

      <main className="flex-1 p-4 ">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
