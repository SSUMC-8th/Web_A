import { createBrowserRouter } from "react-router-dom";
import HomePage from "./layout/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
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
        path: "my",
        element: <MyPage />,
      },
    ],
  },
]);
export default router;
