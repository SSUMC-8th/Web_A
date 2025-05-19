import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation";
import Footer from "../components/Footer";

import { useState } from "react";
import Sidebar from "../components/SideBar/SideBar";

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* 상단 네비게이션 바 */}
      <Navbar onSidebarToggle={() => setIsOpen(!isOpen)} />

      {/* 하단 전체 영역: 사이드바 + 메인 콘텐츠 */}
      <div className="flex flex-1 overflow-x-hidden">
        {/* 왼쪽 사이드바 */}
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 bg-black overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
