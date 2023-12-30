import axios from "axios";
import { error } from "console";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://port-0-reviewus-backend-hkty2alqam2l9c.sel4.cloudtype.app"
    : process.env.REACT_APP_SERVER_URL;

//토큰이 불필요한 경우
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//토큰을 함께 보내는 instance
export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

//리프레시토큰 요청 api
async function postRefreshToken() {
  const userInfo = localStorage.getItem("userInfo") || "";
  const refreshToken = JSON.parse(userInfo).refreshToken;
  const response = publicApi
    .post(
      "/auth/refreshToken",
      JSON.stringify({
        refreshToken,
      })
    )
    .then((res) => res.data)
    .catch((error) => error);

  return response;
}

privateApi.interceptors.request.use(async (config) => {
  const userInfo = localStorage.getItem("userInfo") || "";
  const access_token = JSON.parse(userInfo).accessToken;
  config.headers.Authorization = "Bearer " + access_token;
  return config;
});

//리프레시 토큰 구현
privateApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const {
      config,
      response,
      response: { status },
    } = error;

    if (config && response && status === 401) {
      if (response.data.code === "ET") {
        config._retry = true;
        const refreshTokenInfo = await postRefreshToken();

        if (refreshTokenInfo.code === "SU") {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              userId: refreshTokenInfo.userId,
              nickname: refreshTokenInfo.nickname,
              accessToken: refreshTokenInfo.accessToken,
              refreshToken: refreshTokenInfo.refreshToken,
            })
          );
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + refreshTokenInfo.accessToken;
          return privateApi(config);
        }
      } else if (response.data.code === "PF") {
        return Promise.reject(error);
      } else {
        localStorage.clear();
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);
