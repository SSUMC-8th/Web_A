import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemProvider";

export default function ThemeContext() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <>
      <div
        className={clsx("p-4 h-dvh", isLightMode ? "bg-white" : "bg-black")}
      ></div>
    </>
  );
}
