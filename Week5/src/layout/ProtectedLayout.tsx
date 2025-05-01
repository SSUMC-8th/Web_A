import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/TokenContext/useAuth";
import Navbar from "../components/Navigation";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

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

export default ProtectedLayout;
