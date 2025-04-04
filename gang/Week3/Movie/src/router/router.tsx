import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Popular from "../Pages/Popular";
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
        element: <Popular />,
      },
    ],
  },
  {
    path: "movie/:movieId",
    element: <MovieDetailPage />
  },
]);
