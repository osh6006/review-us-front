import { useRecoilValue } from "recoil";
import { passwordStepState } from "../../hooks/use-password-step";

import OneStep from "./one-step";
import TwoStep from "./two-step";

import { AuthType } from "../../pages/auth";
import StepStatus from "./step-status";
import ThreeStep from "./three-step";

interface FindFormProps {
  setAuth: (type: AuthType) => void;
}

const FindForm: React.FC<FindFormProps> = ({ setAuth }) => {
  const stepState = useRecoilValue(passwordStepState);

  return (
    <div className="mt-8 w-full">
      <StepStatus />
      {stepState.step === 1 && <OneStep setAuth={setAuth} />}
      {stepState.step === 2 && <TwoStep />}
      {stepState.step === 3 && <ThreeStep setAuth={setAuth} />}
      <div className="mt-4 flex items-center gap-x-3">
        <p className="text-xs text-neutral">아직 계정이 없으신가요?</p>
        <span className="link-primary text-xs cursor-pointer " onClick={() => setAuth("login")}>
          로그인 하러 가기
        </span>
      </div>
    </div>
  );
};

export default FindForm;
