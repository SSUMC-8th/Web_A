import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useThrottleFn<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  const lastExecuted = useRef<number>(0);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastExecuted.current >= delay) {
      lastExecuted.current = now;
      fn(...args);
    }
  };
}

export default useThrottleFn;
