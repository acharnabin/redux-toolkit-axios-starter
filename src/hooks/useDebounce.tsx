import  { useEffect, useState } from "react";

const useDebounce = (value: string) => {
  const [_debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return _debounceValue;
};

export default useDebounce;
