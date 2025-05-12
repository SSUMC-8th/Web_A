import RootLayout from "../layout/root-layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import RoutePaths from "./routePaths";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import Mypage from "../pages/Mypage";
import { AuthProvider } from "../context/TokenContext/AuthProvider";
import ProtectedLayout from "../layout/ProtectedLayout";
import GoogleLoginRedirectPage from "../pages/GoogleLoginRedirectPage";
import LpDetailPage from "../pages/LpDetailPage";

// publicRoutes : 인증 없이 접근 가능한 경로
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
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
      {
        path: RoutePaths.GOOGLE_CALLBACK,
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];

// protectedRoutes : 인증이 필요한 경로
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePaths.MYPAGE,
        element: <Mypage />,
      },
      {
        path: RoutePaths.DETAIL,
        element: <LpDetailPage />,
      },
    ],
  },
];
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

const Router: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default Router;
