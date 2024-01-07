import axios, { AxiosError } from "axios";
import { LoginResponse, LoginUser, RegisterResponse, RegisterUser } from "../types/interface";
import { publicApi } from "../utils/axios-setting";

export async function signIn(data: LoginUser) {
  return await publicApi.post(`/auth/signin`, JSON.stringify(data)).then((res) => {
    const user: LoginResponse = res.data;
    return user;
  });
}

export async function signUp(data: RegisterUser) {
  return await publicApi.post(`/auth/signup`, JSON.stringify(data)).then((res) => {
    const resData: RegisterResponse = res.data;
    return resData;
  });
}

export async function checkEmail(email: string) {
  return await publicApi
    .post(`/find/PassWd/verificationsId`, JSON.stringify({ email }))
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      return error.response?.data;
    });
}

export async function sendEmailVerificationCode(email: string) {
  const emailData = new FormData();
  emailData.append("email", email);

  return await publicApi
    .post(`/find/PassWd/mailConfirm`, emailData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      return error.response?.data;
    });
}

export async function checkEmailEmailVerificationCode(code: number) {
  return await publicApi
    .get(`/find/PassWd/verifications?code=${code}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      return error.response?.data;
    });
}

export async function changePassword(data: { email: string; newPasswd: string; checkPasswd: string }) {
  return await publicApi
    .put(`/find/changePassWd`, JSON.stringify(data))
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      return error.response?.data;
    });
}

export async function getSocialLoginCode(code: string) {
  return await publicApi
    .get(`https://port-0-reviewus-backend-hkty2alqam2l9c.sel4.cloudtype.app/login/oauth2/code/google?code=${code}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      return error.response?.data;
    });
}
