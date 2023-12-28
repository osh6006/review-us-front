import { ChangeEvent, useCallback, useRef } from "react";
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

export const useProfileImage = async () => {
  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0];

      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now();

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

        return IMG_URL;
      } catch (error) {
        // console.log(error);
      }
    });
  }, []);

  return imageHandler;
};

export const useProfileImageUploader = () => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return {
    handleFileChange,
  };
};
