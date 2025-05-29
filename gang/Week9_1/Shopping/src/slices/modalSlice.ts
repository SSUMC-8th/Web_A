import { createSlice } from "@reduxjs/toolkit";

interface ModalSlice {
  isModalOpen: boolean;
}

const initialState: ModalSlice = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
