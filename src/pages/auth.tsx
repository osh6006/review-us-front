import { useState } from "react";

import LoginForm from "../components/auth/login-form";
import "../styles/auth-style.css";
import RegisterForm from "../components/auth/register-form";

export type AuthType = "login" | "register";

export default function Auth() {
  const [auth, setAuth] = useState<AuthType>("login");

  const changeAuth = (type: AuthType) => {
    setAuth(type);
  };

  return (
    <div className="p-4 relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute custom-shape-divider-top-1700027138">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center border rounded-3xl py-12 px-16 z-10 bg-white shadow-md">
        <h1 className="text-center text-2xl font-bold uppercase">Review US</h1>
        <p className="text-center">
          즐거운 영어 복습의 시작 REVIEW US와 함께하세요!
        </p>
        {auth === "login" && <LoginForm setAuth={changeAuth} />}
        {auth === "register" && <RegisterForm setAuth={changeAuth} />}
      </div>
    </div>
  );
}
