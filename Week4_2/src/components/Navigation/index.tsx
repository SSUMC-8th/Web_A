import { NavLink } from "react-router-dom";
import RoutePaths from "../../router/routePaths";
import { useAuth } from "../../hook/useAuth";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md">
      <NavLink to={RoutePaths.MAIN} className="text-cyan-600 font-bold text-xl">
        제트의 LP판
      </NavLink>

      <div className="flex gap-3">
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
            <NavLink
              to={RoutePaths.MYPAGE}
              className="px-4 py-2 rounded-md text-sm font-medium bg-white text-black"
            >
              마이페이지
            </NavLink>

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
