import { useState } from "react";
import { useForm } from "react-hook-form";

import { usePasswordStep } from "../../hooks/use-password-step";
import { AuthType } from "../../pages/auth";
import { changePassword } from "../../apis/auth";
import { showToastByCode } from "../../utils/response";

interface ThreeStepProps {
  setAuth: (type: AuthType) => void;
}

const ThreeStep: React.FC<ThreeStepProps> = ({ setAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { nextStep, stepState, prevStep, setEmail, reset } = usePasswordStep();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    newPasswd: string;
    checkPasswd: string;
  }>();

  const onSubmit = async (data: { newPasswd: string; checkPasswd: string }) => {
    setIsLoading(true);
    const res = await changePassword({
      email: stepState.email as string,
      checkPasswd: data.checkPasswd,
      newPasswd: data.newPasswd,
    });
    if (res?.code === "SU") {
      showToastByCode("SU", "비밀번호 변경에 성공하셨습니다. 로그인을 해주세요");
      setAuth("login");
      reset();
    } else {
      showToastByCode(res.code);
    }

    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">현재 이메일</span>
        </label>
        <div className="">
          <input type="email" value={stepState.email!} className="input input-primary input-bordered w-full" disabled />
        </div>
        <label className="label">
          <span className="label-text font-bold">새 비밀번호</span>
        </label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          className="input input-primary input-bordered w-full"
          disabled={isLoading}
          {...register("newPasswd", {
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
              value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
              message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
            },
          })}
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.newPasswd?.message}</span>
        </label>
        <div className="form-control w-full -mt-3">
          <label className="label">
            <span className="label-text font-bold">새 비밀번호 확인</span>
          </label>
          <input
            type="password"
            placeholder="**********"
            className="input input-primary input-bordered w-full"
            {...register("checkPasswd", {
              required: "비밀번호 확인을 입력해 주세요",
              validate: (val: string) => {
                if (watch("newPasswd") !== val) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            })}
            disabled={isLoading}
          />
          <label className="label">
            <span className="label-text-alt text-error">{errors.checkPasswd?.message}</span>
          </label>
        </div>
      </div>
      <div className="flex justify-center gap-x-2">
        <button
          type="button"
          onClick={() => {
            prevStep();
          }}
          className=" flex-1 btn w-full text-primary"
          disabled={isLoading}
        >
          이전으로
        </button>
        <button type="submit" className="flex-1 btn btn-primary w-full text-white" disabled={isLoading}>
          다음으로
        </button>
      </div>
    </form>
  );
};

export default ThreeStep;
