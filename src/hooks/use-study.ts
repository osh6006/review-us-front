import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyStudies,
  getMyStudiesBySearch,
  getMyStudyDetail,
  patchMyStudy,
  postMyStudy,
} from "../apis/study";
import {
  MyStudyFormData,
  MyStudyDetailGetResponse,
  MyStudyGetResponse,
  MyStudySearchResponse,
} from "../types/interface";
import { showToastByCode } from "../utils/response";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useMyStudiesQuery = () => {
  return useQuery<MyStudyGetResponse, AxiosError>({
    queryKey: ["MyStudiesQuery"],
    queryFn: () => getMyStudies(),
    staleTime: Infinity,
    retry: false,
  });
};

export const useMyStudiesSearchQuery = (searchValue: string) => {
  return useQuery<MyStudySearchResponse, AxiosError>({
    queryKey: ["MyStudiesSearchQuery"],
    queryFn: () => getMyStudiesBySearch(searchValue),
    enabled: !!searchValue,
  });
};

export const useMyStudyDetailQuery = (boardNumber?: number) => {
  return useQuery<MyStudyDetailGetResponse, AxiosError>({
    queryKey: ["MyStudyDetailQuery"],
    queryFn: () => getMyStudyDetail(boardNumber!),
    enabled: Number.isInteger(boardNumber) && !!boardNumber,
    select(data) {
      if (!data.boardFileList) {
        data.boardFileList = [];
      }
      if (!data.tagList) {
        data.tagList = [];
      }

      if (data.alarm === undefined) {
        data.alarm = false;
      }
      return data;
    },
  });
};

export const useMyStudyPostMutation = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: (data: MyStudyFormData) => {
      return postMyStudy(data);
    },

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["MyStudiesQuery"],
      });
      showToastByCode("SU", "게시글을 작성하였습니다.");
      nav("/mystudy", { replace: false });
    },

    onError(error: any, variables, context) {
      showToastByCode(
        error.response.data.code,
        "게시글 작성에 실패하였습니다."
      );
    },
  });
};

export const useMyStudyPatchMutation = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: ({
      data,
      boardNumber,
    }: {
      data: MyStudyFormData;
      boardNumber: number;
    }) => {
      return patchMyStudy(data, boardNumber);
    },

    onSuccess(data, variables, context) {
      // console.log(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: ["MyStudiesQuery"],
      });
      showToastByCode("SU", "게시글을 수정하였습니다.");
      nav(-1);
    },

    onError(error: any, variables, context) {
      showToastByCode(error.response.data.code);
    },
  });
};
