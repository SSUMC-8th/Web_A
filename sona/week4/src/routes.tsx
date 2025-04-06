import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MoviePage from "./pages/MoviePage";
import Layout from "./layout/HomePage";
import MovieDetail from "./pages/MovieDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetail />,
      },
    ],
  },
]);
export default router;
