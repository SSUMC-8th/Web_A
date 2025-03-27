import { ThemeProvider } from "../context/ThemProvider";
import NavBar from "./NavBar";
import ThemeContext from "./ThemeContent";

export default function ContextPage() {
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <NavBar />
          <main className="flex-1  w-full">
            <ThemeContext />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
