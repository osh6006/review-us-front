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

export const putProfileImage = async (file: File) => {
  return await privateApi
    .put(
      `/profile/info/image`,
      {
        file: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      // console.log(error);
      throw new Error(error);
    });
};

export const patchProfileNickName = async (name: string) => {
  return await privateApi
    .patch(
      `/profile/changeNickname`,
      JSON.stringify({
        changeNickname: name,
      })
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      // console.log(error);
      throw new Error(error);
    });
};

export const patchProfilePassword = async (data: {
  currentPasswornd: string;
  password: string;
  passwordConfirm: string;
}) => {
  return await privateApi
    .patch(
      `/auth/changePasswd`,
      JSON.stringify({
        currentPasswd: data.currentPasswornd,
        newPasswd: data.password,
        checkPasswd: data.passwordConfirm,
      })
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      // console.log(error);
      return error.response.data;
    });
};

export const getLatestStudies = async () => {
  return await privateApi
    .get("/profile/latest-list")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      // console.log(error);
      return error.response.data;
    });
};
