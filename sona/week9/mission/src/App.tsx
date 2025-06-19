import { Provider } from "react-redux";
import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./store/store";
import CartInformation from "./components/CartInformaion";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <div className="max-w-3xl  mx-auto">
          <CartList />
          <CartInformation />
        </div>
      </Provider>
    </>
  );
}

export default App;
