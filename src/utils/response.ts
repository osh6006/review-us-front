import { toast } from "react-toastify";
import { ResponseCode } from "../types/interface/response-interface";

const defaultDelay = 1500;

export function showToastByCode(
  code: ResponseCode,
  msg?: string,
  delay?: number
) {
  switch (code) {
    case "VF":
      toast.error("아이디와 비밀번호가 일치하지 않습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;
    case "SF":
      toast.error("아이디와 비밀번호가 일치하지 않습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;
    case "DBE":
      toast.error("서버에서 에러가 발생하였습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;

    case "DE":
      toast.error("중복되는 이메일 입니다.", {
        position: "top-center",
        autoClose: 3000,
      });
      break;
    case "NU":
      toast.error("유저가 존재하지 않습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;
    case "AF":
      toast.error("인증에 실패했습니다.", {
        position: "top-center",
        autoClose: 3000,
      });
      break;

    case "NB":
      toast.error("게시글이 존재하지 않습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;

    case "NP":
      toast.error("허용되지 않습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;
    case "NE":
      toast.error("네트워크 에러가 발생했습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;
    case "SU":
      toast.success(msg || "성공하였습니다.", {
        position: "top-center",
        autoClose: delay || defaultDelay,
      });
      break;
  }
}
