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
    .put(
      `/profile/info/image`,
      JSON.stringify({
        profileImage: url,
      })
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

export const patchProfile = async (data: { nickname: string | null; password: string | null }) => {
  return await privateApi
    .patch(
      `/profile/info`,
      JSON.stringify({
        nickname: data.nickname,
        password: data.password || null,
      })
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
