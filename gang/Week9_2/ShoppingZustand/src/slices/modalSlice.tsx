import { type StateCreator } from "zustand";
import type { BoundStore } from "../store/store";

export interface IModalState{
    isModalOpen: boolean;
}
export interface IModalAction{
    openModal: ()=> void
    closeModal: ()=> void
}

export type ModalSlice = IModalAction&IModalState;

//단순 대입은 사본 필요x
const createModalSlice: StateCreator<
  BoundStore,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  ModalSlice
> = (set) => ({
  isModalOpen: false,

  openModal: () => set({ isModalOpen: true },false, 'openModal'),

  closeModal: () => set({ isModalOpen: false },false, 'closeModal '),
});

export default createModalSlice;
