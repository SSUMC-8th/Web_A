import clsx from "clsx";

import ThemeToggleButton from "./ThemeToggleButton";
import { useTheme } from "../../context/Theme/useTheme";
import { THEME } from "../../context/Theme/ThemeType";

const Navbar = () => {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-center items-center",
        isLightMode ? "bg-alceblue" : "bg-gray-800"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
};

export default Navbar;
