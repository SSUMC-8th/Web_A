import { createSlice } from "@reduxjs/toolkit";
import type { ModalState } from "./modalSlice.types";

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
      console.log("모달 열림");
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;
