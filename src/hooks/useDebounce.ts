import { useState, useEffect } from 'react';

function useDebounce(value: any, delay: number) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);
}

export default useDebounce;
