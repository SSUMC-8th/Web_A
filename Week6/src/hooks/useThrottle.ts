import { useCallback, useEffect, useRef } from 'react';

//rest parameter 문법
//...a: any[] => void === T타입의 함수 인자를 무엇이든 받을 수 있게 함
//T가 함수타입이 아닐 때 extends에서 자동으로 타입에러처리
function useThrottle<T extends (...a: any[]) => void>(
  fn: T,
  delay: number = 300,
) {
  const last = useRef<number>(0);
  const saved = useRef(fn);

  useEffect(() => {
    saved.current = fn;
  }, [fn]);

  //useCallback 을 활용한 불필요함수 재생성 방지
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - last.current >= delay) {
        last.current = now;
        saved.current(...args);
      }
    },
    [delay],
  ) as T;
}

export default useThrottle;
