//useThrottle : 주어진값 (상태)가 자주 변경될 때
//최소 delay 간격으로만 업데이트해서 성능을 계산한다

import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, delay = 500): T {
  //1.상태 변수 : throttledValue: 최종적으로 쓰로틀링 적용된 값
  // 초기값은 전달받은 value

  const [throttleValue, setThrottleValue] = useState<T>(value);
  //2.Ref lastExcuted: 마지막으로 실해오딘 시간을 기록하는 변수
  //state는 리렌더링이 일어나면 값이 변경됨 ,
  //  하지만 ref는 useRef를 사용하면 컴포너트가 리렌더링 되어도 값이 유지되고 변경되어도 리렌더리을 트리거하지 않는다

  const lastExcuted = useRef<number>(Date.now());
  //value와 delay가 변경될때 아래로직을 실행함
  useEffect(() => {
    //현재 시간과 lasetExvuted current.value에 저장된 마지막 시각 + Delay을 비교
    // 충분한 시간이 지나면 바로 업데이트함 (쓰로틀링)

    if (Date.now() >= lastExcuted.current + delay) {
      lastExcuted.current = Date.now();

      //최신 value를 throttleValue에 저장해서 컴포너트 리렌더링
      setThrottleValue(value);
    } else {
      //충분한 시간이 지나지 않은 경우 , delay시간 후에 업데이트 , (최신 value로 )

      const timerId = setTimeout(() => {
        //타이머가 완료되면 , 마지막 업데이트 시간을 현재 시각으로 갱신함
        lastExcuted.current = Date.now();
        //쵯니 value를 throttleValue에저장해서 컴포넌트 리렌더링
        setThrottleValue(value);
      }, delay);

      //cleanUo Function useEffect가 재실행되기 전에 타이머가 실행되지 않았다면
      //기존 타이머를  clearTimeout을 통해 취소하여 중복업데이트를 방지한다
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttleValue;
}
