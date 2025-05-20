import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1280);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* 오버레이 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-40 xl:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="z-0 flex flex-col flex-1">
        <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
