"use client";

import Modal from "./modal";

import { useRecoilValue } from "recoil";
import {
  previewModalState,
  usePreviewModal,
} from "../../hooks/use-preview-modal";

import "../study/custom-quill-result.css";

import Preview from "../study/preview";

const PreviewModal = () => {
  const previewData = useRecoilValue(previewModalState);
  const { onClose } = usePreviewModal();

  return (
    <Modal
      isOpen={previewData.isOpen}
      onClose={onClose}
      title="미리보기"
      desc=""
    >
      <div className="max-h-[350px] overflow-y-scroll">
        <Preview priviewData={previewData.previewData!} />
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="btn btn-sm btn-primary text-white"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default PreviewModal;
