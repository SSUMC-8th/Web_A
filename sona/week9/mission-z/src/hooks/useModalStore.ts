// src/stores/modalStore.ts

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
  isOpen: boolean;
  modalOpen: () => void;
  modalClose: () => void;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    modalOpen: () =>
      set((state) => {
        state.isOpen = true;
      }),
    modalClose: () =>
      set((state) => {
        state.isOpen = false;
      }),
    toggleModal: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),
  }))
);
