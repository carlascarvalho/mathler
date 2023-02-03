import { MutableRefObject, useEffect } from 'react';

type ClickEvent = MouseEvent | TouchEvent;

function useOnClickOutside(
  ref: MutableRefObject<any>,
  handler: (event: ClickEvent) => void
) {
  useEffect(() => {
    const listener = (event: ClickEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
