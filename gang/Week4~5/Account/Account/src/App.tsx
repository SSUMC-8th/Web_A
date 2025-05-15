import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Registeration from "./Pages/Registration";
import Home from "./Pages/Home";
import MyPage from "./Pages/MyPage";
import GoogleLogin from "./Pages/GoogleLogin";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetail from "./components/LpDetail/LpDetail";
import LoadingSpinner from "./components/LoadingSpinner";
import { useState } from "react";
import AlertModal from "./components/AlertModal";
import LpModal from "./components/NewLp/LpModal";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
          path: `/lps/:lpId`,
          element: (
            <ProtectedRoute
              onReject={() =>{
                setModalMessage(
                  "로그인이 필요한 서비스입니다. 로그인을 해주세요!"
                );
                setShowModal(true);
              }}
              fallback={<LoadingSpinner />}
            >
              <LpDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mypage",
          element: (
            <ProtectedRoute
              onReject={() => {
                setModalMessage(
                  "로그인이 필요한 서비스입니다. 로그인을 해주세요!"
                );
                setShowModal(true);
              }}
              fallback={<LoadingSpinner />}
            >
              <MyPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/createlp",
          element: (
              <ProtectedRoute
              onReject={() =>{
                setModalMessage(
                  "로그인이 필요한 서비스입니다. 로그인을 해주세요!"
                );
                setShowModal(true);
              }}
              fallback={<LoadingSpinner />}
            >
              <LpModal/>
            </ProtectedRoute>

          )
        }
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {showModal && (
        <AlertModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
