import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "./layout/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import ProtectedLayout from "./layout/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
//로그인 필요없는 페이지
const publicRoutes: RouteObject[] = [
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
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];
//로그인 필요한 페이지
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [{ path: "my", element: <MyPage /> }],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
export default router;
