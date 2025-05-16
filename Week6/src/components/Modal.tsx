import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    /** 버튼 레이블(기본값: “예”) */
    confirmText?: string;
    /** 버튼 레이블(기본값: “아니오”) */
    cancelText?: string;
}

export default function Modal({
    message,
    onConfirm,
    onCancel,
    confirmText = '예',
    cancelText = '아니오',
}: ModalProps) {
    // DOM 계층 구조 바깥에 렌더링
    // createPortal(ReactNode, DOMElement)
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
                        className="flex-1 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
