import { MyStudyFormData, MyStudyPostResponse } from "../types/interface";
import API from "../utils/api";

const userInfo = JSON.parse(localStorage.getItem("loginInfo")!);

export const getMyStudies = async (option?: string) => {
  return await API.get("/mystudy", {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }).then((res) => res.data);
};

export const getMyStudyDetail = async (boardNumber: number) => {
  return await API.get(`/mystudy/${boardNumber}`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const postMyStudy = async (data: MyStudyFormData) => {
  console.log(data);

  return await API.post("/mystudy/create", JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }).then((res) => {
    const resData: MyStudyPostResponse = res.data;
    return resData;
  });
};

export const patchMyStudy = async (
  data: MyStudyFormData,
  boardNumber: number
) => {
  return await API.patch(`/mystudy/${boardNumber}`, JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }).then((res) => {
    const resData: MyStudyPostResponse = res.data;
    return resData;
  });
};

export const deleteMyStudy = async (boardNumber: number) => {
  return API.delete(`/mystudy/${boardNumber}`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((res) => {
      const resData: MyStudyPostResponse = res.data;
      return resData;
    })
    .catch((error) => {
      return error;
    });
};
