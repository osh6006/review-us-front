import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthType } from "../../pages/auth";
import { getSocialLoginCode, signIn } from "../../apis/auth";

import "react-toastify/dist/ReactToastify.css";
import { showToastByCode } from "../../utils/response";
import { LoginUser } from "../../types/interface";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleButton from "./google-button";

import { jwtDecode } from "jwt-decode";

interface LoginFormProps {
  setAuth: (type: AuthType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const reset = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await signIn({
        email: formData.email,
        password: formData.password,
      });
      if (res.code === "SU") {
        // 로그인 성공 시 토큰 저장
        showToastByCode(res.code, "로그인에 성공하였습니다.");
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userId: res.userId,
            nickname: res.nickname,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
        );
        navigate("/");
      } else {
        showToastByCode(res.code);
      }
    } catch (error: any) {
      showToastByCode(error?.response?.data?.code || "NE");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSocialLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // fetching userinfo can be done on the client or the server
      console.log(tokenResponse);

      const test = await getSocialLoginCode(tokenResponse.code);
      console.log(test);
    },
    flow: "auth-code",
    // flow: "implicit", // implicit is the default
  });

  const handleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth"
        : process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI
    }
		&response_type=code
		&scope=email profile
    &access_type=offline
    &prompt=consent
    `;
  };

  return (
    <form className="mt-8 w-full" onSubmit={handleSubmit}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">이메일</span>
        </label>
        <input
          name="email"
          type="email"
          placeholder="example@naver.com"
          className={"input input-primary input-bordered w-full"}
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">비밀번호</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="**********"
          autoComplete="on"
          className={"input input-primary input-bordered w-full"}
          value={formData.password}
          required
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="mt-4 btn btn-primary w-full text-white"
      >
        로그인
      </button>
      <div className="mt-4 flex items-center gap-x-3">
        <p className="text-xs text-neutral">아직 계정이 없으신가요?</p>
        <span
          className="link-primary text-xs cursor-pointer"
          onClick={() => setAuth("register")}
        >
          회원가입
        </span>
      </div>
      <div className="divider text-neutral text-xs">OR</div>
      <div className="w-full">
        <button
          disabled={isLoading}
          onClick={handleGoogleSocialLogin}
          type="button"
          className="btn w-full"
        >
          <img
            src="/images/google.png"
            alt="goole-icon"
            className="max-w-[20px]"
          />
          Google로 로그인
        </button>
        {/* <GoogleButton /> */}
      </div>
    </form>
  );
};

export default LoginForm;
