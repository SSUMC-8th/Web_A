import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

function App() {
  return (
    <div className=" bg-black min-h-screen  overflow-y-auto text-white ">
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </div>
  );
}

export default App;
