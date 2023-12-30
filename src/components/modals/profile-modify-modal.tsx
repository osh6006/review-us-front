import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import {
  profileModifyModal,
  useProfileModifyModal,
} from "../../hooks/use-profile-modify-modal";
import Modal from "./modal";

import { useProfileImageUploader } from "../../hooks/use-profile";

import AvatarEdit from "../mypage/profile-edit/avatar-edit";
import NickNameEdit from "../mypage/profile-edit/nickname-edit";
import PasswordEdit from "../mypage/profile-edit/password-edit";
import Loading from "../common/loading";

const ProfileModifyModal = () => {
  const profileModalValue = useRecoilValue(profileModifyModal);
  const { onClose } = useProfileModifyModal();

  const {
    image,
    setImage,
    handleFileChange,
    inputRef,
    handleButtonClick,
    isLoading,
  } = useProfileImageUploader();

  useEffect(() => {
    setImage(profileModalValue.profileData?.profileImage || null);
  }, [profileModalValue.profileData?.profileImage, setImage, image]);

  return (
    <Modal
      isOpen={profileModalValue.isOpen}
      onClose={onClose}
      title="프로필 수정"
      desc="프로필 정보를 수정해 보세요"
    >
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[500px]">
          <Loading size="lg" type="spinner" />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mt-6 ">
            <AvatarEdit
              imageUrl={image}
              handleButtonClick={handleButtonClick}
            />
            <div className="divider divider-horizontal"></div>
            <div className="flex-1 flex flex-col items-center gap-y-3">
              <NickNameEdit
                nickname={profileModalValue.profileData?.nickname}
              />
              <PasswordEdit />
            </div>
          </div>
          <div className="w-full flex justify-end mt-9 gap-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full btn btn-outline sm:btn-wide"
            >
              확인
            </button>
          </div>

          <input
            accept="image/*"
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </Modal>
  );
};

export default ProfileModifyModal;
