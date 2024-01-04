import { useRecoilValue } from "recoil";

import Modal from "./modal";
import {
  useUserDeleteModal,
  userDeleteModalState,
} from "../../hooks/use-user-delete-modal";

const UserDeleteModal = () => {
  const deleteValue = useRecoilValue(userDeleteModalState);
  const { onClose, onDelete } = useUserDeleteModal();
  return (
    <Modal
      isOpen={deleteValue.isOpen}
      onClose={onClose}
      title="정말로 탈퇴하시겠어요?"
      desc="삭제하면 유저를 되돌릴 수 없습니다."
    >
      <div className="w-full flex justify-end mt-9 gap-x-3">
        <button className="btn btn-outline px-6" onClick={onClose}>
          취소
        </button>
        <button className="btn btn-error px-6 text-white" onClick={onDelete}>
          확인
        </button>
      </div>
    </Modal>
  );
};

export default UserDeleteModal;
