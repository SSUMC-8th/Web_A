export interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

export interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}
