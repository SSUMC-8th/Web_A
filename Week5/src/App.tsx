import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import MoviePage from './pages/Movie/MoviePage';
import Movies from './pages/Movie/components/Movies';
import Detail from './pages/Movie/components/Detail';
import SignupPage from './pages/SignUp/SignupPage';
import Mypage from './pages/Mypage';
import LoginPage from './pages/LoginPage';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            {
                path: 'movies',
                element: <MoviePage />,
                children: [
                    { path: ':category', element: <Movies /> },
                    { path: 'detail/:id', element: <Detail /> },
                    {
                        path: '*',
                        element: <h1>영화 경로를 찾을 수 없습니다</h1>,
                    },
                ],
            },
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
        children: [{ path: '/my', element: <Mypage /> }, {}],
    },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
