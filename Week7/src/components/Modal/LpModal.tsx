import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function LpModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-zinc-800 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-400"
          onClick={onClose}
        >
          x
        </button>

        {/* 모달 내용 */}
        {children}
      </div>
    </div>
  );
}
