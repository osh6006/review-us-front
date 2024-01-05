import { useState } from "react";
import { useForm } from "react-hook-form";

import { checkEmail } from "../../apis/auth";
import { usePasswordStep } from "../../hooks/use-password-step";
import { showToastByCode } from "../../utils/response";

import { AuthType } from "../../pages/auth";

interface OneStepProps {
  setAuth: (type: AuthType) => void;
}

const OneStep: React.FC<OneStepProps> = ({ setAuth }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { nextStep, setEmail, reset } = usePasswordStep();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    email: string;
  }>();

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    const res = await checkEmail(data.email);
    if (res?.code === "SU") {
      setEmail(data.email);
      nextStep();
    } else {
      showToastByCode(res?.code, "이메일이 존재하지 않습니다.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">찾으시려는 이메일 주소</span>
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
          <span className="label-text-alt text-error">{errors.email?.message}</span>
        </label>
      </div>
      <div className="flex justify-center gap-x-2">
        <button
          type="button"
          onClick={() => {
            reset();
            setAuth("login");
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

export default OneStep;
