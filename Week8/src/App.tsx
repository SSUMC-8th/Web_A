import Router from "./router/routes";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router />
    </>
  );
}

export default App;
