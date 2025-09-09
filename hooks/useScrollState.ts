import { useState, useRef, useCallback } from 'react';

interface UseScrollStateReturn {
  isScrolling: boolean;
  onScrollBeginDrag: () => void;
  onScrollEndDrag: () => void;
  onMomentumScrollEnd: () => void;
}

export const useScrollState = (releaseDelayMs: number = 120): UseScrollStateReturn => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollReleaseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onScrollBeginDrag = useCallback(() => {
    if (scrollReleaseTimeout.current) {
      clearTimeout(scrollReleaseTimeout.current);
    }
    setIsScrolling(true);
  }, []);

  const onScrollEndDrag = useCallback(() => {
    scrollReleaseTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, releaseDelayMs);
  }, [releaseDelayMs]);

  const onMomentumScrollEnd = useCallback(() => {
    scrollReleaseTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, releaseDelayMs);
  }, [releaseDelayMs]);

  return {
    isScrolling,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
  };
};
