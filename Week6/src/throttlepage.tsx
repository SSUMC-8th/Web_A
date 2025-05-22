import { useEffect, useState } from 'react';

import useThrottle from './hooks/useThrottle';

function Throttlepage() {
  const [scroll, setScroll] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScroll(window.scrollY);
  });
  //   const handleScroll = () => {
  //     setScroll(window.scrollY);
  //   };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(`현재스크롤 : ${scroll}`);

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div>{`스크롤 : ${scroll}`}</div>
      <button onClick={() => console.log(window.scrollY)}>테스트</button>
    </div>
  );
}

export default Throttlepage;
