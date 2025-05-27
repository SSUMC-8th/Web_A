import { useDispatch, useSelector } from 'react-redux';

import cartItems from '@/constants/cartItems';
import Card from '@/pages/Home/components/Card';
import CardCover from '@/pages/Home/components/CardCover';
import { RootState } from '@/store/CartStore';
import { toggleIsLoggedIn } from '@/store/CartStore';

function Home() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);

  const toggleLoggedIn = () => dispatch(toggleIsLoggedIn());

  return (
    <section className="grid grid-cols-4 gap-4">
      <div>{isLoggedIn ? 'ㅇㅇ' : 'ㄴㄴ'}</div>
      <button onClick={toggleLoggedIn}>바꿔</button>
      {cartItems.map((cart) => {
        return (
          <div
            key={cart.id}
            className="relative transition-transform duration-300 group hover:scale-105"
          >
            <Card img={cart.img} />
            <CardCover
              title={cart.title}
              price={cart.price}
              amount={cart.amount}
            />
          </div>
        );
      })}
    </section>
  );
}

export default Home;
