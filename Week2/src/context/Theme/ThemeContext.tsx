import { createContext } from "react";
import type { TTheme } from "./ThemeType";

export interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
