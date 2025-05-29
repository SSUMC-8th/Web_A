import ClearAllModal from "./ClearAllModal";
import { modalSlice } from "../slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";

const ClearButton = () => {
    const dispatch = useAppDispatch();
    const {openModal, closeModal} = modalSlice.actions; 
    const isModalOpen = useAppSelector((state)=>state.modal.isModalOpen)
  return (
    <>
      <button
        type="button"
        onClick={()=>dispatch(openModal())}
        className="border-2 m-2 p-2 rounded-2xl text-xl font-bold bg-gray-300 hover:bg-gray-400"
      >
        전체 삭제
      </button>

      {isModalOpen&& <ClearAllModal onClose={()=> dispatch(closeModal())}/>}
    </>
  );
};

export default ClearButton;
