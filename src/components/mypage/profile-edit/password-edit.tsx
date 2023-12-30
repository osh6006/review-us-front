import { useForm } from "react-hook-form";
import { showToastByCode } from "../../../utils/response";
import { patchProfilePassword } from "../../../apis/my-page";
import axios from "axios";

const PasswordEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<{
    currentPasswornd: string;
    password: string;
    passwordConfirm: string;
  }>();

  const onSubmit = async (data: {
    currentPasswornd: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const res = await patchProfilePassword(data);

    if (res.code === "SU") {
      showToastByCode("SU", "비밀번호 변경에 성공하였습니다.");
      reset();
      localStorage.clear();
      window.location.reload();
    }
    if (res.code === "PF") {
      showToastByCode(res.code);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-2"
    >
      <div className="">
        <label htmlFor="nickname" className="label">
          비밀번호 변경
        </label>
        <div className="space-y-2">
          <input
            className="input text-center input-primary w-full"
            placeholder="현재 비밀번호"
            type="password"
            {...register("currentPasswornd", {
              required: "현재 비밀번호를 입력해 주세요",
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
          />
          {errors.currentPasswornd?.message && (
            <div className="text-xs text-error flex justify-end">
              {errors.currentPasswornd?.message}
            </div>
          )}
        </div>
      </div>
      <input
        className="input text-center input-primary"
        placeholder="새로운 비밀번호"
        type="password"
        {...register("password", {
          required: "새로운 비밀번호를 입력해 주세요",
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
      {errors.password?.message && (
        <div className="text-xs text-error flex justify-end">
          {errors.password?.message}
        </div>
      )}
      <input
        className="input text-center input-primary"
        placeholder="비밀번호 확인"
        type="password"
        {...register("passwordConfirm", {
          required: "비밀번호 확인을 입력해 주세요",
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "비밀번호가 일치하지 않습니다.";
            }
          },
        })}
      />
      {errors.passwordConfirm?.message && (
        <div className="text-xs text-error flex justify-end">
          {errors.passwordConfirm?.message}
        </div>
      )}
      <div className="flex justify-end">
        <button className="w-full btn btn-primary sm:w-auto">변경하기</button>
      </div>
    </form>
  );
};

export default PasswordEdit;
