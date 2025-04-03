import RootLayout from "../layout/root-layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoutePaths from "./routePaths";
import MoviesPage from "../pages/MoviePage";
import MovieDetailPage from "../pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        path: RoutePaths.MOVIE,
        element: <MoviesPage />,
      },
      {
        path: RoutePaths.MOVIEDETAIL,
        element: <MovieDetailPage />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
