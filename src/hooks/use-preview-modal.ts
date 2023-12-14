import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { MyStudyFormData } from "../types/interface";

interface PreviewModalState {
  isOpen: boolean;
  previewData: MyStudyFormData | null;
}

export const previewModalState = atom<PreviewModalState>({
  key: "PreviewModalState",
  default: {
    isOpen: false,
    previewData: null,
  },
});

export const usePreviewModal = () => {
  const previewData = useRecoilValue(previewModalState);
  const setPreviewState = useSetRecoilState(previewModalState);

  const onOpen = (data: MyStudyFormData) => {
    setPreviewState({ isOpen: true, previewData: data });
  };
  const onClose = () => {
    setPreviewState({ ...previewData, isOpen: false });
  };

  return { onOpen, onClose };
};
