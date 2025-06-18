import { useBoundStore } from "../store/store";

function ClearAllModal({ onClose }: { onClose: () => void }) {
  const clearAll = useBoundStore((state) => state.clearAll);
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-2xs shadow-lg"
        aria-modal="true"
        aria-labelledby="clear-modal-title"
      >
        <div className="flex flex-col justify-center bg-white rounded-2xl">
          <h2 className="font-bold text-center p-2">정말 삭제하시겠습니까?</h2>
          <div className="flex justify-between m-2">
            <button
              type="button"
              onClick={() => {
                clearAll();
                onClose();
              }}
              className="border px-3 py-2 rounded-2xl bg-red-400 text-white font-bold hover:bg-red-500"
            >
              예
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className=" border  px-3 py-2 rounded-2xl bg-gray-400 text-white font-bold hover:bg-gray-500"
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClearAllModal;
