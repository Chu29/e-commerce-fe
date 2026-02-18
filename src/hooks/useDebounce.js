import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clear the timeout
    return () => clearTimeout(handler);
  });

  return debouncedValue;
};

export { useDebounce };
