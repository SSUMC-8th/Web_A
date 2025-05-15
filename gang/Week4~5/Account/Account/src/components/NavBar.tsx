import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react";

interface INavBar {
  onMenuClick: () => void;
}
const NavBar = ({ onMenuClick }: INavBar) => {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <nav className="bg-black text-white flex items-center">
      <button
        type="button"
        className=" text-white  px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        onClick={onMenuClick}
      >
        <Menu />
      </button>
      <NavLink
              to="/"
              className=" font-bold text-xl px-4 py-2 text-"
            >
              Spinning Wheel
            </NavLink>
      <div className="flex flex-row items-end justify-end w-full">
        {isLoggedIn ? (
          <>
            <span className="px-2 py-2">{username}님 환영합니다</span>
            <NavLink
              to="/mypage"
              className="hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
            >
              My Page
            </NavLink>
            <NavLink
              to="/logout"
              className="justify-end  items-end hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
              onClick={logout}  
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="justify-end  items-end hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
            >
              Login
            </NavLink>
            <NavLink
              to="/registration"
              className="justify-end  items-end hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
