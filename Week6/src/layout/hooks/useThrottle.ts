import { useEffect, useState } from 'react';

function useThrottle<T>(f: T, delay: number) {
  const [throttle, setThrottle] = useState<boolean>(false);

  const handler = () => {
    if (!throttle) {
      setThrottle(true);
      setTimeout(() => {
        f;
        setThrottle(false);
      }, delay);
    }
  };
}

export default useThrottle;
