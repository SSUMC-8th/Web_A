import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemProvider";

export default function ThemeToggleBtn() {
  const { toggleTheme, theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <>
      <button
        onClick={toggleTheme}
        className={clsx("px-4 py-2 mt-4 rounded-md transition-all ", {
          "bg-black text-white": !isLightMode,
          "bg-white text-black": isLightMode,
        })}
      >
        {isLightMode ? "🌑Dark" : "🌝Light"}
      </button>
    </>
  );
}
