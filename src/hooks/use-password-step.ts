import { atom, selector, useRecoilState } from "recoil";

interface PasswordStepState {
  step: number;
  email: string | null;
}

export const passwordStepState = atom<PasswordStepState>({
  key: "PasswordStepState",
  default: {
    email: null,
    step: 1,
  },
});

export const usePasswordStep = () => {
  const [stepState, setStepState] = useRecoilState(passwordStepState);

  const nextStep = () => {
    if (stepState.step === 3) return;
    setStepState((prevState) => {
      return { ...prevState, step: prevState.step + 1 };
    });
  };

  const reset = () => {
    setStepState((prevState) => {
      return { email: null, step: 1 };
    });
  };

  const prevStep = () => {
    if (stepState.step === 0) return;
    setStepState((prevState) => ({ ...prevState, step: prevState.step - 1 }));
  };

  const setEmail = (email: string | null) => {
    setStepState({ ...stepState, email });
  };

  return { nextStep, prevStep, stepState, setEmail, reset };
};
