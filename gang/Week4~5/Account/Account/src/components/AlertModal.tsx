interface AlertModalProps {
    message: string;
    onClose: () => void;
  }
  
  export default function AlertModal({ message, onClose }: AlertModalProps) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="mb-4">{message}</p>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded transform hover:bg-gray-600 transition duration-300"
          >
            확인
          </button>
        </div>
      </div>
    );
  }
  