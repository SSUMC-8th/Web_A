import Modal from '#/components/Modal';

type LpHeaderProps = {
  isMyLp: boolean;
  editState: {
    isEditing: boolean;
    submitEdit: () => void;
    cancelEdit: () => void;
    startEdit: () => void;
  };
  deleteState: {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    confirmDelete: () => void;
  };
};

function LpHeader({ isMyLp, editState, deleteState }: LpHeaderProps) {
  return (
    <>
      {isMyLp && (
        <div className="flex gap-2">
          {editState.isEditing ? (
            <>
              <button
                className="px-3 py-2 font-semibold text-white bg-blue-500 rounded-md"
                onClick={editState.submitEdit}
              >
                수정 완료
              </button>
              <button
                className="px-3 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md"
                onClick={editState.cancelEdit}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                className="px-3 py-2 font-semibold text-blue-500 border border-blue-500 rounded-md"
                onClick={editState.startEdit}
              >
                수정
              </button>
              <button
                className="px-3 py-2 font-semibold text-white bg-red-500 rounded-md"
                onClick={deleteState.openModal}
              >
                삭제
              </button>
            </>
          )}
          {deleteState.isModalOpen && (
            <Modal
              message="정말 삭제하시겠습니까?"
              onConfirm={deleteState.confirmDelete}
              onCancel={deleteState.closeModal}
            />
          )}
        </div>
      )}
    </>
  );
}

export default LpHeader;
