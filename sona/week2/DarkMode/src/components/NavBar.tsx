import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemProvider";
import ThemeToggleBtn from "./ThemeToggleBtn";

export default function NavBar() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  //   console.log(theme);
  return (
    <>
      <nav
        className={clsx(
          "p-4 w-full flex justify-end",
          isLightMode ? "bg-white" : "bg-black"
        )}
      >
        <ThemeToggleBtn />
      </nav>
    </>
  );
}
