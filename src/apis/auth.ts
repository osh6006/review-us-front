import {
  LoginResponse,
  LoginUser,
  RegisterResponse,
  RegisterUser,
} from "../types/interface";
import API from "../utils/api";

export async function signIn(data: LoginUser) {
  return await API.post(`/auth/signin`, JSON.stringify(data)).then((res) => {
    const user: LoginResponse = res.data;
    return user;
  });
}

export async function signUp(data: RegisterUser) {
  return await API.post(`/auth/signup`, JSON.stringify(data)).then((res) => {
    const resData: RegisterResponse = res.data;
    return resData;
  });
}
