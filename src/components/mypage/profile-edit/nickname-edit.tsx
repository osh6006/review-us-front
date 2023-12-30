import { useForm } from "react-hook-form";
import { patchProfileNickName } from "../../../apis/my-page";
import { showToastByCode } from "../../../utils/response";
import { useQueryClient } from "@tanstack/react-query";

interface NickNameEditProps {
  nickname?: string;
}

const NickNameEdit: React.FC<NickNameEditProps> = ({ nickname }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ nickname: string }>({
    values: {
      nickname: nickname || "",
    },
  });

  const onSubmit = async (data: { nickname: string }) => {
    const res = await patchProfileNickName(data.nickname);
    if (res.code === "SU") {
      showToastByCode("SU", "닉네임 변경에 성공하셨습니다.");
      queryClient.invalidateQueries({ queryKey: ["MyProfileQuery"] });
    } else {
      showToastByCode(res.code, "닉네임 변경에 실패하였습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label htmlFor="nickname" className="label">
        닉네임 수정
      </label>
      <div className="flex flex-col gap-x-2 gap-y-2 sm:flex-row">
        <div className="flex-1 space-y-2">
          <input
            className="w-full input input-primary text-center"
            placeholder="닉네임을 입력해 주세요"
            {...register("nickname", {
              required: "닉네임을 입력해 주세요",
              minLength: {
                value: 2,
                message: "최소 2글자 이상 입력해야 합니다.",
              },
            })}
          />
          {errors.nickname?.message && (
            <div className="text-xs text-error flex justify-end">
              {errors.nickname?.message}
            </div>
          )}
        </div>
        <button className="btn btn-primary">수정</button>
      </div>
    </form>
  );
};

export default NickNameEdit;
