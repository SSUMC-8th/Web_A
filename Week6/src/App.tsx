import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Layout from './layout/Layout';
import SignupPage from './pages/SignUp/SignupPage';
import Mypage from './pages/Mypage/Mypage';
import LoginPage from './pages/Login/LoginPage';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/Login/GoogleLoginRedirectPage';
import Lp from './pages/Lp/Lp';
import ROUTES from './constants/routes';
import { API_AUTH } from './constants/api';

const publicRoutes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <Layout />,
        children: [
            { path: ROUTES.HOME, element: <HomePage /> },
            { path: ROUTES.LOGIN, element: <LoginPage /> },
            { path: ROUTES.SIGNUP, element: <SignupPage /> },
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
