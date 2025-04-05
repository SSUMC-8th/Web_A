import { NavLink } from "react-router-dom";
import RoutePaths from "../../router/routePaths";

const LINKS = [
  { to: RoutePaths.MAIN, label: "홈" },
  { to: RoutePaths.POPULAR, label: "인기 영화" },
  { to: RoutePaths.NOWPLAY, label: "상영 중" },
  { to: RoutePaths.TOPRATED, label: "높은 순위" },
  { to: RoutePaths.UPCOMING, label: "상영 예정" },
];

const Navbar = () => {
  return (
    <nav className="flex gap-3 p-4 bg-black shadow-md">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "text-red-300 font-bold underline"
              : "text-[#ffffff] hover:text-blue-300"
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
