import { useQuery } from "@tanstack/react-query";

import { getFakeMyStudies, getFakeMyStudyDetail } from "../apis/fake-study";

import {
  MyStudyGetResponse,
  MyStudyDetailGetResponse,
  MyStudyFormData,
} from "../types/interface";
import { AxiosError } from "axios";

export const useFakeMyStudiesQuery = (userid?: number, option?: string) => {
  return useQuery<MyStudyGetResponse, AxiosError>({
    queryKey: ["MyFakeStudiesQuery"],
    queryFn: () => getFakeMyStudies(),
    staleTime: Infinity,
  });
};

export const useFakeMyStudyDetailQuery = (boardNumber?: number) => {
  return useQuery<MyStudyDetailGetResponse, AxiosError>({
    queryKey: ["MyFakeStudyQuery"],
    queryFn: () => getFakeMyStudyDetail(),
    enabled: Number.isInteger(boardNumber) && !!boardNumber,
    staleTime: Infinity,
  });
};
