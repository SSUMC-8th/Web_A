import { NavLink } from "react-router-dom";
import RoutePaths from "../../router/routePaths";

const LINKS = [
  { to: RoutePaths.LOGIN, label: "로그인" },
  { to: RoutePaths.SIGNUP, label: "회원가입" },
];

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md">
      <NavLink to={RoutePaths.MAIN} className="text-cyan-600 font-bold text-xl">
        제트의 LP판
      </NavLink>

      <div className="flex gap-3">
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-white text-black"
                  : label === "회원가입"
                  ? "bg-cyan-600 text-white"
                  : "bg-black border border-white text-white"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
