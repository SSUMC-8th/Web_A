import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
  //검색에서는 string이지만 사용에따라 다를 수있음. 제네릭선언

  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // value나 delay가 변경될 때 마다 실행
  useEffect(() => {
    //delay (ms)이후에 실행한다
    //ex)delay가 300ms일때,무엇을 치던 0.3초후에 동작함
    //delay시간 후에 value를 devouncedValue로 업데이트하는 타이머를 시작한다.
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    //value가 변경되면 , 기존 타이머를 지워서 업데이트를 취소한다.
    //값이 계속 바뀔때마다 마지막에 멈춘 값만 업데이트된다 .
    return () => clearTimeout(handler);
  }, [value, delay]);
  //최종적으로 잠시 대기 탄 후의 값을 반환함
  return debouncedValue;
}
