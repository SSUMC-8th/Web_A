import { Provider } from "react-redux";
import "./App.css";
import CartList from "./components/Cart/CartList/CartList";
import Navbar from "./components/NavigationBar/Navbar";
import store from "./store/store";
import TotalPrice from "./components/Cart/TotalPrice/TotalPrice";
import ClearCartModal from "./components/Modal/ClearCartModal/ClearCartModal";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="max-w-175 mx-auto">
        <CartList />
        <TotalPrice />
      </div>
      <ClearCartModal />
    </Provider>
  );
}

export default App;
