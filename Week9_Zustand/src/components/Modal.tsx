import { createPortal } from 'react-dom';

import { modalStore } from '@/store/modalStore';

export default function Modal() {
  const {
    isOpen,
    message,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    closeModal,
  } = modalStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={handleCancel} />
      <div className="relative z-10 w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <p className="mb-6 text-center text-gray-900 break-keep">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {confirmText}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
