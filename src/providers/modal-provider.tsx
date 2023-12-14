import PreviewModal from "../components/modals/preview-modal";
import StudyDeleteModal from "../components/modals/study-delete-modal";

const ModalProvider = () => {
  return (
    <>
      <PreviewModal />
      <StudyDeleteModal />
    </>
  );
};

export default ModalProvider;
