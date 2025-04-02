import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

//movie/umcoming
//movie/popular
//movie/playing

function App() {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
