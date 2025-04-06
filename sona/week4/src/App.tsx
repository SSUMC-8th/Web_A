import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

//movie/umcoming
//movie/popular
//movie/playing

function App() {
  return (
    <>
      <div className=" bg-black min-h-screen  overflow-y-auto ">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </div>
    </>
  );
}

export default App;
