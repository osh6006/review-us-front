import axios from "axios";

const temp = localStorage.getItem("userInfo");
const userInfo = temp ? JSON.parse(temp) : "";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export default API;

//토큰이 불필요한 경우
export const publicApi = axios.create({
  baseURL: `http://localhost:8080`,
});

//토큰을 함께 보내는 instance
export const privateApi = axios.create({
  baseURL: `http://localhost:8080`,
  headers: {
    Authorization: `Bearer ${userInfo.accessToken}`,
  },
});

//리프레시토큰 요청 api
async function postRefreshToken() {
  const refreshToken = userInfo.accessToken;
  const response = publicApi
    .post("/auth/refreshToken", JSON.stringify(refreshToken))
    .then((res) => res.data);

  return response;
}

privateApi.interceptors.request.use((config) => {
  const token = "accessToken";
  config.headers.Authorization = "Bearer " + token;
  return config;
});

//리프레시 토큰 구현
privateApi.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      if (error.response.data.code === "AF") {
        const originRequest = config;
        try {
          const res = await postRefreshToken();
          if (res.status === 201) {
            const newAccessToken = res.data.token;
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                userId: res.memberId,
                nickname: res.nickname,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
              })
            );
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originRequest);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (
              error.response?.status === 404 ||
              error.response?.status === 422
            ) {
              localStorage.clear();
              window.location.replace("/auth");
            } else {
              // alert(LOGIN.MESSAGE.ETC);
            }
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
