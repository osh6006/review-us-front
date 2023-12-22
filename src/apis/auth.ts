import {
  LoginResponse,
  LoginUser,
  RegisterResponse,
  RegisterUser,
} from "../types/interface";
import { publicApi } from "../utils/axios-setting";

export async function signIn(data: LoginUser) {
  return await publicApi
    .post(`/auth/signin`, JSON.stringify(data))
    .then((res) => {
      const user: LoginResponse = res.data;
      return user;
    });
}

export async function signUp(data: RegisterUser) {
  return await publicApi
    .post(`/auth/signup`, JSON.stringify(data))
    .then((res) => {
      const resData: RegisterResponse = res.data;
      return resData;
    });
}
