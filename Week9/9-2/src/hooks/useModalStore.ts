import { useShallow } from "zustand/shallow";
import { useModalStore } from "../store/Modal/modalStore";

export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );

export const useModalAction = () => useModalStore((state) => state.actions);
