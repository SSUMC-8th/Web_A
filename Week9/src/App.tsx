import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import Layout from '@/layout/layout';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home/Home';

const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.CART, element: <Cart /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
