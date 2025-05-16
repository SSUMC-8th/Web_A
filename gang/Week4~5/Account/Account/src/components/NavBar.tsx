import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react";

interface INavBar {
  onMenuClick: () => void;
}

const NavBar = ({ onMenuClick }: INavBar) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white flex items-center">
      <button
        type="button"
        className="text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        onClick={onMenuClick}
      >
        <Menu />
      </button>
      <NavLink to="/" className="font-bold text-xl px-4 py-2">
        Spinning Wheel
      </NavLink>

      <div className="flex flex-row items-end justify-end w-full">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/mypage"
              className="hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
            >
              My Page
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
            >
              Login
            </NavLink>
            <NavLink
              to="/registration"
              className="hover:bg-gray-700 transition duration-300 px-4 py-2 rounded-md"
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
