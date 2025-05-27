import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl  mx-auto">
        <CartList />
      </div>
    </>
  );
}

export default App;
