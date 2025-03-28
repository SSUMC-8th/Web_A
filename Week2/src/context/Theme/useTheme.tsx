import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme은 반드시 ThemeProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
