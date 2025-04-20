import { createBrowserRouter } from "react-router-dom";
import HomePage from "./layout/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { SignUpPassword } from "./pages/SignUpPassword";
import Profile from "./pages/Profile";
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
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signUpPassword",
        element: <SignUpPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
export default router;
