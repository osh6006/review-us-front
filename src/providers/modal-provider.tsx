import PreviewModal from "../components/modals/preview-modal";
import ProfileModifyModal from "../components/modals/profile-modify-modal";
import StudyDeleteModal from "../components/modals/study-delete-modal";
import UserDeleteModal from "../components/modals/user-delete-modal";

const ModalProvider = () => {
  return (
    <>
      <PreviewModal />
      <StudyDeleteModal />
      <ProfileModifyModal />
      <UserDeleteModal />
    </>
  );
};

export default ModalProvider;
