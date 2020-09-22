import { useCallback, useEffect } from 'react';

const useScrollTop = (): (() => void) => {
  return useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
};

export const useScrollToTopOnMount = (): void => {
  const scroll = useScrollTop();
  useEffect(() => {
    scroll();
  }, [scroll]);
};

export default useScrollTop;
