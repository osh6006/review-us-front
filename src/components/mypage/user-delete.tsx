import { useUserDeleteModal } from "../../hooks/use-user-delete-modal";

const UserDelete = () => {
  const { onOpen } = useUserDeleteModal();
  return (
    <div className="flex justify-center sm:justify-end items-center max-w-7xl">
      <button
        onClick={() => onOpen()}
        className="btn btn-wide btn-error text-white"
      >
        회원탈퇴
      </button>
    </div>
  );
};

export default UserDelete;
