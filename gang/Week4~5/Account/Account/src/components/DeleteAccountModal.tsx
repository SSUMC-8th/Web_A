import { useNavigate } from "react-router-dom";
import { deleteMyInfo } from "../apis/user";

interface DeleteAccountModalProps {
  onClose: () => void;
}

const DeleteAccountModal = ({ onClose }: DeleteAccountModalProps) => {
  const navigate = useNavigate();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMyInfo();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900 p-6 rounded-lg w-96">
        <div className="flex w-full justify-end items-end px-3">
          <button type="button" className="text-white" onClick={onClose}>
            x
          </button>
        </div>
        <div className="text-center text-white mb-4">정말 탈퇴하시겠습니까?</div>

        <div className="flex flex-row justify-between items-center">
          <button
            type="button"
            onClick={handleDelete}
            className="m-4 bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-400"
          >
            예
          </button>
          <button
            type="button"
            onClick={onClose}
            className="m-4 bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-400"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
