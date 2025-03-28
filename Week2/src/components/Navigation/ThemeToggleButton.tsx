import clsx from "clsx";
import { useTheme } from "../../context/Theme/useTheme";
import { THEME } from "../../context/Theme/ThemeType";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 mt-4 rounded-md transition-all", {
        "bg-black text-white": !isLightMode,
        "bg-white text-black": isLightMode,
      })}
    >
      {isLightMode ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
};

export default ThemeToggleButton;
