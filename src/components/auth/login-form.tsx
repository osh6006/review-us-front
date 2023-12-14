import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../recoil/auth-state";

import { AuthType } from "../../pages/auth";
import { signIn } from "../../apis/auth";

import "react-toastify/dist/ReactToastify.css";
import { showToastByCode } from "../../utils/response";
import { LoginUser } from "../../types/interface";

interface LoginFormProps {
  setAuth: (type: AuthType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthentication();

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
        login(res.token, res.expirationTime);
        showToastByCode(res.code, "로그인에 성공하였습니다.");
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
      <div className="divider text-neutral">OR</div>
      <div className="flex items-center justify-center gap-x-4">
        <button type="button" className="btn-square ">
          <img src="/images/Naver.png" alt="btn" />
        </button>
        <button type="button" className="btn-square">
          <img src="/images/Kakao.png" alt="btn" />
        </button>
        <button type="button" className="btn-square ">
          <img src="/images/Instagram.png" alt="btn" />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
