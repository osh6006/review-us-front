import { useRecoilValue } from "recoil";
import { deleteModalState, useDeleteModal } from "../../hooks/use-delete-modal";
import Modal from "./modal";

const StudyDeleteModal = () => {
  const deleteValue = useRecoilValue(deleteModalState);
  const { onClose, onDelete } = useDeleteModal();
  return (
    <Modal
      isOpen={deleteValue.isOpen}
      onClose={onClose}
      title="정말로 삭제하시겠어요?"
      desc="삭제하면 데이터를 되돌릴 수 없습니다."
    >
      <div className="w-full flex justify-end mt-9 gap-x-3">
        <button className="btn btn-outline px-6" onClick={onClose}>
          취소
        </button>
        <button className="btn btn-error px-6" onClick={onDelete}>
          확인
        </button>
      </div>
    </Modal>
  );
};

export default StudyDeleteModal;
