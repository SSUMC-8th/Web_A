import RootLayout from "../layout/root-layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoutePaths from "./routePaths";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        path: RoutePaths.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RoutePaths.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
