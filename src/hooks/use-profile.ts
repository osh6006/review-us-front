import { ChangeEvent, useRef, useState } from "react";
import { AxiosError } from "axios";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { showToastByCode } from "../utils/response";

import {
  getHistories,
  getLatestStudies,
  getMyProfile,
  putProfileImage,
} from "../apis/my-page";

import {
  HistoryResponse,
  LatestStudyResponse,
  ProfileUserInfoResponse,
} from "../types/interface/response-interface";

import { useProfileModifyModal } from "./use-profile-modify-modal";

export const useMyProfileQuery = () => {
  return useQuery<ProfileUserInfoResponse, AxiosError>({
    queryKey: ["MyProfileQuery"],
    queryFn: () => getMyProfile(),
  });
};

export const useProfileImageUploader = () => {
  const queryclient = useQueryClient();
  const { onClose } = useProfileModifyModal();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    // 파일 업로드 버튼을 클릭합니다.
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        // 이미지 서버에 저장
        setIsLoading(true);
        const file = e.target.files[0];
        await putProfileImage(file);
        queryclient.invalidateQueries({ queryKey: ["MyProfileQuery"] });
        showToastByCode("SU", "이미지를 변경하였습니다.");
        setIsLoading(false);
        onClose();
      } catch (error) {
        showToastByCode("VF", "이미지 업로드에 실패하였습니다.");
      }
    }
  };

  return {
    handleFileChange,
    image,
    setImage,
    handleButtonClick,
    inputRef,
    isLoading,
  };
};

export const useLatestStudy = () => {
  return useQuery<LatestStudyResponse, AxiosError>({
    queryKey: ["LatestStudiesQuery"],
    queryFn: () => getLatestStudies(),
  });
};

export const useHistory = (startDate: string, endDate: string) => {
  return useQuery<HistoryResponse, AxiosError>({
    queryKey: ["HistoryQuery", startDate, endDate],
    queryFn: () => getHistories(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};
