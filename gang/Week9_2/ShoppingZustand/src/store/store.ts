import { create } from "zustand";
import type { ModalSlice } from "../slices/modalSlice";
import type { CartSlice } from "../slices/cartSlice";
import createModalSlice from "../slices/modalSlice";
import createCartSlice from "../slices/cartSlice";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type BoundStore = ModalSlice & CartSlice;

export const useBoundStore = create<BoundStore>()(
  devtools(
    immer((...set) => ({
      ...createModalSlice(...set),
      ...createCartSlice(...set),
    }))
  )
);
