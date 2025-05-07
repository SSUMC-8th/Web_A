import { NavLink } from "react-router-dom";
import RoutePaths from "../../router/routePaths";
import { useAuth } from "../../context/TokenContext/useAuth";
import { SearchIcon } from "lucide-react";

type NavbarProps = {
  onSidebarToggle: () => void;
};

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const { logout, isLoggedIn } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md z-50">
      <div className="flex items-center gap-3">
        {/* 사이드바 토글 버튼 */}
        <button
          id="sidebar-toggle-btn"
          onClick={onSidebarToggle}
          className="text-white p-2 "
        >
          ☰
        </button>
        <NavLink
          to={RoutePaths.MAIN}
          className="text-cyan-600 font-bold text-xl"
        >
          제트의 LP판
        </NavLink>
      </div>
      <div className="flex gap-3 items-center">
        <NavLink to={RoutePaths.SEARCH} className="text-white text-sm">
          <SearchIcon />
        </NavLink>
        {!isLoggedIn ? (
          <>
            <NavLink
              to={RoutePaths.LOGIN}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-black border border-white text-white"
                }`
              }
            >
              로그인
            </NavLink>

            <NavLink
              to={RoutePaths.SIGNUP}
              className="px-4 py-2 rounded-md text-sm font-medium bg-cyan-600 text-white"
            >
              회원가입
            </NavLink>
          </>
        ) : (
          <>
            <div className="px-4 py-2 rounded-md text-sm font-medium text-white">
              제트님, 반갑습니다.
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 text-white"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
