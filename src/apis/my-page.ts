import { privateApi } from "../utils/axios-setting";

export const getMyProfile = async () => {
  return await privateApi
    .get("/profile/main")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const putProfileImage = async (url: string) => {
  return await privateApi
    .put("/profile/info/image")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error("Oh no!", error);
    });
};
