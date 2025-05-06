import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Layout from './layout/Layout';
import SignupPage from './pages/SignUp/SignupPage';
import Mypage from './pages/Mypage';
import LoginPage from './pages/LoginPage';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import Lp from './pages/Lp/Lp';

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'signup', element: <SignupPage /> },
            {
                path: 'v1/auth/google/callback',
                element: <GoogleLoginRedirectPage />,
            },
        ],
    },
];

const protectedRoutes: RouteObject[] = [
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            { path: '/my', element: <Mypage /> },
            { path: '/lp/:lpId', element: <Lp /> },
        ],
    },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
