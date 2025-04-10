import Login from "./Pages/Login"
import Registeration from "./Pages/Registration"
import NotFound from "./Pages/NotFound"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import HomeLayout from "./Layouts/HomeLayout";
import MyPage from "./Pages/MyPage";

const router = createBrowserRouter( [
  {
    path:"/",
    element:<HomeLayout/>,
    errorElement: <NotFound/>,
    children:[
      {
        index:true, element: <Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/registration",
        element:<Registeration/>
      },
      {
        path:"/mypage",
        element:<MyPage/>
      }
    ]
  }
]);
function App() {
  return  <RouterProvider router = {router}/>
}

export default App
