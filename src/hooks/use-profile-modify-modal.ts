import { atom, useSetRecoilState } from "recoil";
import { ProfileUserInfoResponse } from "../types/interface/response-interface";

interface ProfileModifyModalState {
  isOpen: boolean;
  profileData?: ProfileUserInfoResponse | null;
}

export const profileModifyModal = atom<ProfileModifyModalState>({
  key: "ProfileModifyModalState",
  default: {
    isOpen: false,
    profileData: {
      nickname: "",
      email: "",
      message: "",
      code: "AF",
      profileImage: "",
    },
  },
});

export const useProfileModifyModal = () => {
  const setPreviewState = useSetRecoilState(profileModifyModal);

  const onOpen = (data: ProfileUserInfoResponse) => {
    setPreviewState({ isOpen: true, profileData: data });
  };
  const onClose = () => {
    setPreviewState({
      isOpen: false,
      profileData: null,
    });
  };

  return { onOpen, onClose };
};
