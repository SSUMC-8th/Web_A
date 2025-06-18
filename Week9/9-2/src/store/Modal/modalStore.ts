import { create } from "zustand";
import type { ModalState } from "./modalStore.types";
import { immer } from "zustand/middleware/immer";

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    actions: {
      openModal: () =>
        set((state) => {
          state.isOpen = true;
          console.log("모달 열림");
        }),
      closeModal: () =>
        set((state) => {
          state.isOpen = false;
        }),
    },
  }))
);
