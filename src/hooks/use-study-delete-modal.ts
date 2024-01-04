import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { deleteMyStudy } from "../apis/study";
import { showToastByCode } from "../utils/response";
import { useQueryClient } from "@tanstack/react-query";

interface StudyDeleteModalState {
  isOpen: boolean;
  boardNumber: number | null;
  isDelete: boolean;
}

export const studyDeleteModalState = atom<StudyDeleteModalState>({
  key: "StudyDeleteModalState",
  default: {
    isOpen: false,
    boardNumber: null,
    isDelete: false,
  },
});

export const useStudyDeleteModal = () => {
  const deleteState = useRecoilValue(studyDeleteModalState);
  const setDeleteState = useSetRecoilState(studyDeleteModalState);
  const queryClient = useQueryClient();

  const onOpen = (boardNumber: number | null) => {
    setDeleteState({ isOpen: true, boardNumber, isDelete: false });
  };
  const onClose = () => {
    setDeleteState({ ...deleteState, isOpen: false });
  };

  const onSuccess = () => {
    setDeleteState({ boardNumber: null, isDelete: true, isOpen: false });
    queryClient.invalidateQueries({ queryKey: ["MyStudiesQuery"] });
  };

  const onFail = () => {
    setDeleteState({ boardNumber: null, isDelete: false, isOpen: false });
  };

  const onDelete = async () => {
    const res = await deleteMyStudy(deleteState.boardNumber!);
    if (res.code === "SU") {
      onSuccess();
      showToastByCode(res.code, "삭제에 성공하였습니다.");
    } else {
      onFail();
      showToastByCode(res.code);
    }
  };

  return { onOpen, onClose, onDelete };
};
