import { MyStudyFormData, MyStudyPostResponse } from "../types/interface";
import { privateApi } from "../utils/axios-setting";

export const getMyStudies = async (
  size = 8,
  lastBoardNumber: unknown,
  searchWord?: string
) => {
  let url = `/mystudy/nooffset/?size=${size}`;

  // lastBoardNumber가 주어졌을 때만 추가
  if (lastBoardNumber) {
    url += `&lastBoardNumber=${lastBoardNumber}`;
  }

  // searchWord가 주어졌을 때만 추가
  if (searchWord !== undefined) {
    url += `&searchWord=${encodeURIComponent(searchWord)}`;
  }

  return await privateApi.get(url).then((res) => {
    return res.data;
  });
};

export const getMyStudiesBySearch = async (searchValue: string) => {
  return await privateApi
    .get(`/mystudy/search-list/${searchValue}`)
    .then((res) => res.data);
};

export const getMyStudyDetail = async (boardNumber: number) => {
  return await privateApi.get(`/mystudy/${boardNumber}`).then((res) => {
    return res.data;
  });
};

export const postMyStudy = async (data: MyStudyFormData) => {
  return await privateApi
    .post("/mystudy/create", JSON.stringify(data))
    .then((res) => {
      const resData: MyStudyPostResponse = res.data;
      return resData;
    });
};

export const patchMyStudy = async (
  data: MyStudyFormData,
  boardNumber: number
) => {
  return await privateApi
    .patch(`/mystudy/${boardNumber}`, JSON.stringify(data))
    .then((res) => {
      const resData: MyStudyPostResponse = res.data;
      return resData;
    });
};

export const deleteMyStudy = async (boardNumber: number) => {
  return privateApi
    .delete(`/mystudy/${boardNumber}`)
    .then((res) => {
      const resData: MyStudyPostResponse = res.data;
      return resData;
    })
    .catch((error) => {
      return error;
    });
};
