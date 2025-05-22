import { useToggleLike } from '@/features/likes/hooks/useToggleLike';
import useThrottle from '@/hooks/useThrottle';
import { LpItem } from '@/types/lps';

function useLpLike(lp: LpItem, alreadyLiked: boolean | undefined) {
  const { mutate: toggleLike } = useToggleLike();
  const throttledToggleLike = useThrottle(toggleLike, 1000);

  const handleToggleLike = () => {
    throttledToggleLike({
      lpId: lp.id,
      isLiked: alreadyLiked ?? false,
    });
  };

  return handleToggleLike;
}

export default useLpLike;
