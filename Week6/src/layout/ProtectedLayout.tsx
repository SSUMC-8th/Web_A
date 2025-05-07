import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/TokenContext/useAuth";
import Navbar from "../components/Navigation";
import Footer from "../components/Footer";
import RoutePaths from "../router/routePaths";
import { useState } from "react";
import Sidebar from "../components/SideBar/SideBar";

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to={RoutePaths.LOGIN} replace />;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* 상단 네비게이션 바 */}
      <Navbar onSidebarToggle={() => setIsOpen(!isOpen)} />

      {/* 하단 전체 영역: 사이드바 + 메인 콘텐츠 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽 사이드바 */}
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 bg-zinc-900 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProtectedLayout;
