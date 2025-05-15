import { useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
const LpAddButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        className="w-16 h-16 flex  rounded-full bg-green-600 justify-center items-center text-white text-3xl font-bold shadow-lg hover:bg-green-700"
        onClick={() =>
          navigate("/createlp", { state: { backgroundLocation: location } })
        }
      >
        <Plus />
      </button>
    </div>
  );
};

export default LpAddButton;
