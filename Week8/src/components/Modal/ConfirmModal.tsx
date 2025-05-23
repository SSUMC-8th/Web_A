type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-3 text-xl text-white"
        >
          ×
        </button>
        <p className="text-center text-lg mb-6">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-gray-400 text-black px-4 py-2 rounded"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
