import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ModalState {
  isOpen: boolean;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm?: () => void;
  onCancel?: () => void;

  openModal: (options: {
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => void;

  closeModal: () => void;
}

export const modalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    message: '',
    confirmText: '예',
    cancelText: '아니오',
    onConfirm: undefined,
    onCancel: undefined,

    openModal: ({ message, confirmText, cancelText, onConfirm, onCancel }) =>
      set((state) => {
        state.isOpen = true;
        state.message = message;
        state.confirmText = confirmText ?? '예';
        state.cancelText = cancelText ?? '아니오';
        state.onConfirm = onConfirm;
        state.onCancel = onCancel;
      }),

    closeModal: () =>
      set((state) => {
        state.isOpen = false;
        state.message = '';
        state.confirmText = '예';
        state.cancelText = '아니오';
        state.onConfirm = undefined;
        state.onCancel = undefined;
      }),
  })),
);
