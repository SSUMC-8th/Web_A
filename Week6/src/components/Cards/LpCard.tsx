import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/TokenContext/useAuth";

type LpCardProps = {
  id: number;
  thumbnail: string;
  title: string;
  updatedAt: string;
  likes: { id: number }[];
};

const LpCard = ({ id, thumbnail, title, updatedAt, likes }: LpCardProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    navigate(`/lp/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
    >
      <img
        src={thumbnail}
        alt="앨범 커버"
        className="w-full aspect-square object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-80 text-white opacity-0 hover:opacity-70 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-sm font-bold truncate">{title}</p>
        <p className="text-xs text-gray-300">{updatedAt.slice(0, 10)}</p>
        <p className="text-xs text-gray-300">❤️ {likes.length}</p>
      </div>
    </div>
  );
};

export default LpCard;
