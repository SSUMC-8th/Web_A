interface CardProps {
  img: string;
}

function Card({ img }: CardProps) {
  return <img src={img} alt="img" className="object-cover w-full"></img>;
}

export default Card;
