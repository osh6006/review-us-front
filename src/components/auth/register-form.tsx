import { useState } from "react";

import { useForm } from "react-hook-form";

import { AuthType } from "../../pages/auth";
import { signUp } from "../../apis/auth";

import { removeProperty } from "../../utils/common";
import { showToastByCode } from "../../utils/response";
import { RegistFormData } from "../../types/interface";

interface RegisterFormProps {
  setAuth: (type: AuthType) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<RegistFormData>();

  const onSubmit = async (data: RegistFormData) => {
    try {
      setIsLoading(true);
      const res = await signUp(removeProperty(data, "passwordConfirm"));
      if (res.code === "SU") {
        showToastByCode("SU", "회원가입에 성공하였습니다.");
        reset();
        setAuth("login");
      }
    } catch (error: any) {
      showToastByCode(error?.response?.data?.code || "NE");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">닉네임</span>
        </label>
        <input
          type="text"
          placeholder="열심이"
          className="input input-primary input-bordered w-full"
          disabled={isLoading}
          {...register("nickname", {
            required: "닉네임을 입력해 주세요",
            minLength: {
              value: 2,
              message: "최소 2글자 이상 입력해야 합니다.",
            },
            maxLength: {
              value: 15,
              message: "15글자 이상은 입력하실 수 없습니다.",
            },
          })}
        />
        <label className="label">
          <span className="label-text-alt text-error">
            {errors.nickname?.message}
          </span>
        </label>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">이메일</span>
        </label>
        <input
          type="email"
          placeholder="example@naver.com"
          className="input input-primary input-bordered w-full"
          disabled={isLoading}
          {...register("email", {
            required: "이메일을 입력해 주세요",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "유효한 이메일 형식이 아닙니다.",
            },
          })}
        />
        <label className="label">
          <span className="label-text-alt text-error">
            {errors.email?.message}
          </span>
        </label>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">비밀번호</span>
        </label>
        <input
          type="password"
          placeholder="**********"
          className="input input-primary input-bordered w-full"
          {...register("password", {
            required: "비밀번호를 입력해 주세요",
            minLength: {
              value: 8,
              message: "비밀번호는 8글자 이상이어야 합니다.",
            },
            maxLength: {
              value: 25,
              message: "25글자 이상은 입력하실 수 없습니다.",
            },
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
              message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
            },
          })}
          disabled={isLoading}
        />
        <label className="label">
          <span className="label-text-alt text-error">
            {errors.password?.message}
          </span>
        </label>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">비밀번호 확인</span>
        </label>
        <input
          type="password"
          placeholder="**********"
          className="input input-primary input-bordered w-full"
          {...register("passwordConfirm", {
            required: "비밀번호 확인을 입력해 주세요",
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "비밀번호가 일치하지 않습니다.";
              }
            },
          })}
          disabled={isLoading}
        />
        <label className="label">
          <span className="label-text-alt text-error">
            {errors.passwordConfirm?.message}
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 btn btn-primary w-full text-white"
        disabled={isLoading}
      >
        회원가입
      </button>
      <div className="mt-4 flex items-center gap-x-3">
        <p className="text-xs text-neutral">아직 계정이 없으신가요?</p>
        <span
          className="link-primary text-xs cursor-pointer "
          onClick={() => setAuth("login")}
        >
          로그인 하러 가기
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
