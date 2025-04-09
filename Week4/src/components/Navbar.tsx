import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";

function Navbar(): ReactElement {
  const location = useLocation();

  type TNavItems = {
    label: string;
    path: string;
  };

  const navItems: TNavItems[] = [
    { label: "인기 영화", path: "popular" },
    { label: "상영 중", path: "upcoming" },
    { label: "평점 높은", path: "top-rated" },
    { label: "개봉 예정", path: "now_playing" },
  ];

  return (
    <nav className="relative flex items-center justify-between gap-6 px-6 py-4 border-b border-gray-400">
      <div className="flex items-end">
        <Link
          to="/"
          className="mr-8 text-3xl italic font-extrabold text-gray-900 transition hover:text-indigo-600"
        >
          Movie Archive
        </Link>

        <div className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={`/movies/${item.path}`}
              className={clsx(
                "text-base text-gray-700 hover:text-indigo-600 transition",
                location.pathname.includes(`/movies/${item.path}`) &&
                  "font-bold text-indigo-700 underline underline-offset-4"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Link to={`/login`} className="text-lg hover:text-indigo-600">
          Log in
        </Link>
        <Link to={`/signup`} className="text-lg hover:text-indigo-600">
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
