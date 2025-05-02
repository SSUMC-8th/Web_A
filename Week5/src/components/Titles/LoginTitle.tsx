import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
};

const LoginTitle = ({ text }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center h-12 mb-2 w-[300px]">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-[0px] text-white cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <h1 className="text-white text-xl font-semibold px-8">{text}</h1>
    </div>
  );
};

export default LoginTitle;
