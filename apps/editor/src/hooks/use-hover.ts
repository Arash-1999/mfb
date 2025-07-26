import type { RefObject } from "react";

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseHoverProps {
  enabled?: boolean;
}

interface UseHoverReturn<TElement extends HTMLElement> {
  isHovered: boolean;
  ref: RefObject<null | TElement>;
}

const useHover = <TElement extends HTMLElement>(props: UseHoverProps = { enabled: true }): UseHoverReturn<TElement> => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<TElement>(null);

  const handleMouseOver = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsHovered(true)
  }, []);
  const handleMouseOut = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsHovered(false)
  }, []);

  useEffect(() => {
    let _ref = null;
    if (!props.enabled) return;

    if (ref.current !== null) {
      _ref = ref.current
      ref.current.addEventListener('mouseover', handleMouseOver)
      ref.current.addEventListener('mouseout', handleMouseOut)
    }

    return () => {
      if (_ref !== null) {
        _ref.removeEventListener('mouseover', handleMouseOver);
        _ref.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [props.enabled, handleMouseOut, handleMouseOver]);

  return { isHovered, ref, };
}

export { useHover };
export type { UseHoverProps, UseHoverReturn };
