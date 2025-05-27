import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

//modalSlice생성
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state) => {
      state.isOpen = true;
    },

    modalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;
//duck pattern , reducer는 export default로 내보내야함
const modalReducer = modalSlice.reducer;
export default modalReducer;
