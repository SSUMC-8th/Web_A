import "./App.css";
import CartList from "./components/Cart/CartList/CartList";
import Navbar from "./components/NavigationBar/Navbar";
import TotalPrice from "./components/Cart/TotalPrice/TotalPrice";
import ClearCartModal from "./components/Modal/ClearCartModal/ClearCartModal";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-175 mx-auto">
        <CartList />
        <TotalPrice />
      </div>
      <ClearCartModal />
    </>
  );
}

export default App;
