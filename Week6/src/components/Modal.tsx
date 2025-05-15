// src/components/common/Modal.tsx
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
    /** 열림‧닫힘 여부 */
    open: boolean;
    /** 본문 메시지 */
    message: string;
    /** “예” 클릭 시 실행 */
    onConfirm: () => void;
    /** “아니오” 클릭 시 실행 */
    onCancel: () => void;
    /** 버튼 레이블(기본값: “예”) */
    confirmText?: string;
    /** 버튼 레이블(기본값: “아니오”) */
    cancelText?: string;
}

export default function Modal({
    open,
    message,
    onConfirm,
    onCancel,
    confirmText = '예',
    cancelText = '아니오',
}: ModalProps) {
    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black opacity-60"
                onClick={onCancel}
            />
            {/* dialog */}
            <div className="relative z-10 w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                {/* 메시지 */}
                <p className="mb-6 text-center text-gray-900">{message}</p>

                {/* 버튼 그룹 */}
                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 py-2 text-gray-900 transition bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        {confirmText}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 text-white transition bg-pink-500 rounded-md hover:bg-pink-600"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
