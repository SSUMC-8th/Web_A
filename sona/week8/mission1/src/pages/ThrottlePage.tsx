import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

export default function ThrottlePage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  //지도일 때 상태가 바뀐다.

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  console.log("리렌더링");
  //지도 내릴 때 (ex.서울에서 부산을 간다면 드래그를 내리면서 다른 지역들도 알게됨, 근데 굳이?임(내가 원하는 건 부산이라는 지역이기 때문)
  //하지만 중간중간 궁금할수도 있음 , 2초마다 다른지역들 검색도 알려줌 => throttle)

  return (
    <div className="h-[1000px] flex flex-col items-center justify-center ">
      <div className="">
        <h1>쓰로틀링이 무엇일까요</h1>
        <p>ScrollY:{scrollY}px</p>
      </div>
    </div>
  );
}
