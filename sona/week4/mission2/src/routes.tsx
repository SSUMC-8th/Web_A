import { createBrowserRouter } from "react-router-dom";
import HomePage from "./layout/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
