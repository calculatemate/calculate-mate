import React, { useState, useCallback, useRef, useMemo, Ref } from 'react';

export interface UseIsVisibleProps {
  isVisible: boolean;
  toggle: () => void;
  onClickAway: (event: React.MouseEvent<EventTarget, MouseEvent>) => void;
  close: () => void;
  anchorRef: Ref<HTMLButtonElement & HTMLDivElement>;
}

export default function useIsVisible(): UseIsVisibleProps {
  const [isVisible, setIsVisible] = useState(false);

  const toggle: any = useCallback(() => {
    setIsVisible(prev => !prev);
  }, [setIsVisible]);

  const close: any = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const anchorRef = useRef<HTMLButtonElement & HTMLDivElement>(null);
  const onClickAway = useCallback(
    (event: React.MouseEvent<EventTarget>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return;
      }
      setIsVisible(false);
    },
    [setIsVisible, anchorRef],
  );

  return useMemo(() => ({ isVisible, toggle, anchorRef, onClickAway, close }), [
    anchorRef,
    isVisible,
    onClickAway,
    toggle,
    close,
  ]);
}
