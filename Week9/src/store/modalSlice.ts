import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const initialState: ModalState = {
  isOpen: false,
  message: '',
  confirmText: '예',
  cancelText: '아니오',
  onConfirm: undefined,
  onCancel: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        message: string;
        onConfirm: () => void;
        onCancel?: () => void;
        confirmText?: string;
        cancelText?: string;
      }>,
    ) => {
      // 열기
      state.isOpen = true;
      // 모달설정
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm;
      state.onCancel = action.payload.onCancel;
      state.confirmText = action.payload.confirmText ?? '예';
      state.cancelText = action.payload.cancelText ?? '아니오';
    },
    closeModal: (state) => {
      // 닫기
      state.isOpen = false;
      // 함수 초기화
      state.onConfirm = undefined;
      state.onCancel = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
