import { Provider } from "react-redux";
import "./App.css";
import CardList from "./components/CardList";
import MenuBar from "./components/MenuBar";
import store from "./store/store";
import PriceBox from "./components/PriceBox";

function App() {
  return (
    <Provider store={store}>
      <MenuBar />
      <CardList />
      <PriceBox/>
    </Provider>
  );
}

export default App;
