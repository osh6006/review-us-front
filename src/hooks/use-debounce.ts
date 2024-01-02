import { useState, useEffect } from "react";

const useQueryDebounce = (value: string, delay = 200) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(value);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [value, delay]);

  return debouncedInputValue;
};

export default useQueryDebounce;
