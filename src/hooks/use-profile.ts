import { ChangeEvent, useCallback, useRef, useState } from "react";
import { AxiosError } from "axios";
import AWS from "aws-sdk";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { showToastByCode } from "../utils/response";

import { getMyProfile, putProfileImage } from "../apis/my-page";
import { ProfileUserInfoResponse } from "../types/interface/response-interface";

export const useMyProfileQuery = () => {
  return useQuery<ProfileUserInfoResponse, AxiosError>({
    queryKey: ["MyProfileQuery"],
    queryFn: () => getMyProfile(),
    staleTime: 0,
    retry: false,
  });
};

export const useMyStudyPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string) => {
      return putProfileImage(data);
    },

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["MyProfileQuery"],
      });
      showToastByCode("SU", "이미지 수정에 성공하였습니다.");
    },

    onError(error: any, variables, context) {
      showToastByCode(
        error.response.data.code,
        "이미지 수정에 실패하였습니다."
      );
    },
  });
};

// AWS Keys
const REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
const ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;

export const useProfileImageUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<null | string>(null);

  const handleButtonClick = () => {
    // 파일 업로드 버튼을 클릭합니다.
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const name = Date.now();
        const file = e.target.files[0];

        //생성한 s3 관련 설정들
        AWS.config.update({
          region: REGION,
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_ACCESS_KEY,
        });
        // 앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "review-us-test", //버킷 이름
            Key: `upload/${name}`,
            Body: file,
          },
        });

        //이미지 업로드 후
        //곧바로 업로드 된 이미지 url을 가져오기
        const IMG_URL = await upload.promise().then((res) => res.Location);
        setImage(IMG_URL);
        const res = await putProfileImage(IMG_URL);
        // console.log(res);

        // 이미지 서버에 저장
      } catch (error) {
        showToastByCode("AF", "이미지 업로드에 실패하였습니다.");
      }
    }
  };

  return {
    handleFileChange,
    image,
    setImage,
    handleButtonClick,
    inputRef,
  };
};
