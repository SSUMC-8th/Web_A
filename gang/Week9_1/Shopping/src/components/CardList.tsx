import Card from "./Card";
import { useAppSelector } from "../hooks/useCustomRedux";
import ClearButton from "./ClearButton";

function CardList() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <div className="flex flex-col gap-2 items-center justify-center bg-blue-300 ">
      <div>
        <ul>
          {cartItems.map((item) => (
            <Card key={item.id} lp={item} />
          ))}
        </ul>
      </div>
      <div className="w-full flex justify-end items-center m-2">
        <ClearButton />
      </div>
    </div>
  );
}

export default CardList;
