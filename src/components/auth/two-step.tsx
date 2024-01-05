import { useState } from "react";
import { usePasswordStep } from "../../hooks/use-password-step";
import { useForm } from "react-hook-form";
import { showToastByCode } from "../../utils/response";
import { checkEmailEmailVerificationCode, sendEmailVerificationCode } from "../../apis/auth";

const TwoStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nextStep, stepState, prevStep, setEmail } = usePasswordStep();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    verificationCode: number;
  }>();

  const onSubmit = async (data: { verificationCode: number }) => {
    setIsLoading(true);
    const res = await checkEmailEmailVerificationCode(data.verificationCode);

    if (res.code === "SU") {
      nextStep();
      showToastByCode(res.code, "코드가 일치합니다");
    } else {
      showToastByCode(res.code);
    }
    setIsLoading(false);
  };

  const handleSend = async () => {
    const res = await sendEmailVerificationCode(stepState.email!);
    if (res.code === "SU") {
      showToastByCode("SU", "코드를 보냈습니다.");
    } else {
      showToastByCode(res.code, "코드를 보내는데 실패하였습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">현재 이메일</span>
        </label>
        <div className="flex justify-center gap-x-2">
          <input type="email" value={stepState.email!} className="input input-primary input-bordered w-full" disabled />
          <button type="button" onClick={handleSend} className="btn btn-primary">
            보내기
          </button>
        </div>
        <label className="label">
          <span className="label-text font-bold">인증 번호</span>
        </label>
        <input
          type="number"
          placeholder="인증번호를 입력해 주세요"
          className="input input-primary input-bordered w-full"
          disabled={isLoading}
          {...register("verificationCode", {
            required: "인증번호를 입력해 주세요",
          })}
        />
        <label className="label">
          <span className="label-text-alt text-error">{errors.verificationCode?.message}</span>
        </label>
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

export default TwoStep;
