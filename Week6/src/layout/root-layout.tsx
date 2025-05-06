import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>
        <Navbar />
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
