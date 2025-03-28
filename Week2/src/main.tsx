import { PropsWithChildren, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToDoProvider } from "./context/ToDo/ToDoProvider.tsx";
import { ThemeProvider } from "./context/Theme/ThemeProvider.tsx";

export const AppProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <ToDoProvider>{children}</ToDoProvider>
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
