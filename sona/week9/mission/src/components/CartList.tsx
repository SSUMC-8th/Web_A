import cartItems from "../constants/cartItem";
import CartItems from "./CartItems";

export default function CartList() {
  return (
    <div>
      <ul>
        {cartItems.map((item) => {
          return <CartItems lp={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}
