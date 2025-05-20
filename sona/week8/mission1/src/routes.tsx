import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import ProtectedLayout from "./layout/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import Layout from "./layout/HomeLayout";
import Home from "./pages/Home";
import CardDetail from "./pages/CardDetail";
import Comment from "./pages/Comment";
import LpDetailEdit from "./pages/LpDetailEdit";
import ThrottlePage from "./pages/ThrottlePage";
//로그인 필요없는 페이지
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "throttle",
        element: <ThrottlePage />,
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
    children: [
      { path: "my", element: <MyPage /> },
      {
        path: "lp/:id",
        element: <CardDetail />,
      },
      {
        path: "lp/:id/comment",
        element: <Comment />,
      },
      { path: "lp/:id/edit", element: <LpDetailEdit /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
export default router;
