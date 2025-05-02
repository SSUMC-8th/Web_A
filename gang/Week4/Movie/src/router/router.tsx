import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import MovieList from "../Pages/MovieList";
import NotFound from "../Pages/NotFound";
import MovieDetailPage from "../Pages/MovieDetailPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies/:category",
        element: <MovieList />,
      },
    ],
  },
  {
    path: "movie/:movieId",
    element: <MovieDetailPage />
  },// 선택한 영화의 상세정보를 보여주는 페이지-페이지네이션 가림
]);
