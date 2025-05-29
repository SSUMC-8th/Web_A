import { useShallow } from "zustand/shallow";
import { useBoundStore } from "../store/store";
import ClearAllModal from "./ClearAllModal";

const ClearButton = () => {
    //여러 state 한번에 가져오기 (shallow-x,ㅌ useShallow 사용)
    //단 얕은 복사이기 때문에 원본 변경 시 리렌더링이 일어나지 않음->  사본 전달/ immer 활용용
    const { isModalOpen, openModal, closeModal } = useBoundStore(
    useShallow((state) => ({
      isModalOpen: state.isModalOpen,
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  );
  return (
    <>
      <button
        type="button"
        onClick={() => openModal()}
        className="border-2 m-2 p-2 rounded-2xl text-xl font-bold bg-gray-300 hover:bg-gray-400"
      >
        전체 삭제
      </button>

      {isModalOpen && <ClearAllModal onClose={() => closeModal()} />}
    </>
  );
};

export default ClearButton;
