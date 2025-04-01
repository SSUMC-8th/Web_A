import "./App.css";

// 1. import를 해줍니다.
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>홈 페이지입니다.</h1>,
  },
  {
    path: "/movies",
    element: <h1>영화 페이지 입니다.</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
