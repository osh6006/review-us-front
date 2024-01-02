import { useState, useRef } from "react";

const useQueryDebounce = (delay = 400) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchWord, setSearchWord] = useState("");

  const onInputChange = () => {
    setTimeout(() => {
      if (inputRef.current) {
        setSearchWord(inputRef.current.value); // 변경된 input 값을 콘솔에 출력
      }
    }, delay);
  };

  return {
    inputRef,
    searchWord,
    onInputChange,
  };
};

export default useQueryDebounce;
