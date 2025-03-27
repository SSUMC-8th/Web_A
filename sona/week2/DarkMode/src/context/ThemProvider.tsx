import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TThem = THEME.LIGHT | THEME.DARK;
interface IThemeContext {
  theme: THEME.LIGHT | THEME.DARK;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<TThem>(THEME.LIGHT);
  const toggleTheme = (): void => {
    setTheme((pre): THEME => {
      return pre === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
