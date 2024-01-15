import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { showToastByCode } from "../utils/response";
import { deleteUser } from "../apis/my-page";

interface UserDeleteModalState {
  isOpen: boolean;
  isDelete: boolean;
}

export const userDeleteModalState = atom<UserDeleteModalState>({
  key: "UserDeleteModalState",
  default: {
    isOpen: false,
    isDelete: false,
  },
});

export const useUserDeleteModal = () => {
  const deleteState = useRecoilValue(userDeleteModalState);
  const setDeleteState = useSetRecoilState(userDeleteModalState);

  const onOpen = () => {
    setDeleteState({ isOpen: true, isDelete: false });
  };
  const onClose = () => {
    setDeleteState({ ...deleteState, isOpen: false });
  };

  const onSuccess = () => {
    setDeleteState({ isDelete: true, isOpen: false });
  };

  const onFail = () => {
    setDeleteState({ isDelete: false, isOpen: false });
  };

  const onDelete = async () => {
    const res = await deleteUser();
    if (res.code === "SU") {
      onSuccess();
      localStorage.clear();
      window.location.reload();
      showToastByCode(res.code, "탈퇴에 성공하였습니다.");
    } else if (res.code === "ET") {
      onSuccess();
      localStorage.clear();
      window.location.reload();
      showToastByCode(res.code, "탈퇴에 성공하였습니다.");
    } else {
      onFail();
      showToastByCode(res.code);
    }
  };

  return { onOpen, onClose, onDelete };
};
