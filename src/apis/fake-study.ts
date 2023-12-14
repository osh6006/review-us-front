import axios from "axios";
import { MyStudyFormData, MyStudyPostResponse } from "../types/interface";

export const getFakeMyStudies = async (option?: string) => {
  return await axios.get("/fake-data/my-studies.json").then((res) => res.data);
};

export const getFakeMyStudyDetail = async (boardNumber?: number) => {
  return await axios
    .get("/fake-data/my-study-detail.json")
    .then((res) => res.data);
};

export const postFakeMyStudy = async (data: MyStudyFormData) => {
  return await axios
    .post("/mystudy/create", {
      data: JSON.stringify(data),
    })
    .then((res) => {
      const resData: MyStudyPostResponse = res.data;
      return resData;
    });
};
