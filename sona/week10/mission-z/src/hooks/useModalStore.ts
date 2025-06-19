import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Movie } from "../types/movie";

interface ModalState {
  selectedMovie: Movie | null;
  isOpen: boolean;
  modalOpen: (movie: Movie) => void;
  modalClose: () => void;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    selectedMovie: null,
    isOpen: false,
    modalOpen: (movie) =>
      set((state) => {
        state.isOpen = true;
        state.selectedMovie = movie;
      }),
    modalClose: () =>
      set((state) => {
        state.isOpen = false;
        state.selectedMovie = null;
      }),
  }))
);
