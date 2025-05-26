import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { API_AUTH } from '@/constants/api';
import ROUTES from '@/constants/routes';
import Layout from '@/layout/Layout';
import ProtectedLayout from '@/layout/ProtectedLayout';
import HomePage from '@/pages/Home/HomePage';
import GoogleLoginRedirectPage from '@/pages/Login/GoogleLoginRedirectPage';
import LoginPage from '@/pages/Login/LoginPage';
import Lp from '@/pages/Lp/Lp';
import Mypage from '@/pages/Mypage/Mypage';
import SignupPage from '@/pages/SignUp/SignupPage';

import SearchPage from './pages/SearchPage';
import Throttlepage from './throttlepage';

const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.SEARCH, element: <SearchPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      { path: '/test', element: <Throttlepage /> },
      {
        path: API_AUTH.GOOGLE_CALLBACK,
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedLayout>
        <Layout />
      </ProtectedLayout>
    ),
    children: [
      { path: ROUTES.MYPAGE, element: <Mypage /> },
      { path: ROUTES.LP_DETAIL(), element: <Lp /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
