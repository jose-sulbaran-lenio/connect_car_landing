import { useEffect, useRef } from "react";

export function useTimeout(callback, delay, start) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === "number" && start) {
      const timeoutId = setTimeout(() => {
        callbackRef.current();
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [delay, start]);
}
