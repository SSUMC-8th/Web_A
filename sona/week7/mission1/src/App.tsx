import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className=" bg-black min-h-screen  overflow-y-auto text-white ">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </div>
    </AuthProvider>
  );
}

export default App;
