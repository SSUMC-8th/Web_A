import Login from "./Pages/Login";
import Registeration from "./Pages/Registration";
import NotFound from "./Pages/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import HomeLayout from "./Layouts/HomeLayout";
import MyPage from "./Pages/MyPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import GoogleLogin from "./Pages/GoogleLogin";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registeration />,
      },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLogin />,
      },
      {
        path: "/mypage",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
