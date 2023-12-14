import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { deleteMyStudy } from "../apis/study";
import { showToastByCode } from "../utils/response";

interface DeleteModalState {
  isOpen: boolean;
  boardNumber: number | null;
  isDelete: boolean;
}

export const deleteModalState = atom<DeleteModalState>({
  key: "DeleteModalState",
  default: {
    isOpen: false,
    boardNumber: null,
    isDelete: false,
  },
});

export const useDeleteModal = () => {
  const deleteState = useRecoilValue(deleteModalState);
  const setDeleteState = useSetRecoilState(deleteModalState);

  const onOpen = (boardNumber: number | null) => {
    setDeleteState({ isOpen: true, boardNumber, isDelete: false });
  };
  const onClose = () => {
    setDeleteState({ ...deleteState, isOpen: false });
  };

  const onSuccess = () => {
    setDeleteState({ boardNumber: null, isDelete: true, isOpen: false });
  };

  const onFail = () => {
    setDeleteState({ boardNumber: null, isDelete: false, isOpen: false });
  };

  const onDelete = async () => {
    const res = await deleteMyStudy(deleteState.boardNumber!);
    showToastByCode(res.response?.data?.code);
    if (res.response.data.code === "SU") {
      onSuccess();
    } else {
      onFail();
    }
  };

  return { onOpen, onClose, onDelete };
};
