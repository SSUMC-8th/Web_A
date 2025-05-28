import cartItems from '@/constants/cartItems';
import Card from '@/pages/Home/components/Card';
import CardCover from '@/pages/Home/components/CardCover';

function Home() {
  return (
    <section className="grid grid-cols-4 gap-4">
      {cartItems.map((cart) => (
        <div
          key={cart.id}
          className="relative transition-transform duration-300 group hover:scale-105"
        >
          <Card img={cart.img} />
          <CardCover cart={cart} />
        </div>
      ))}
    </section>
  );
}

export default Home;
