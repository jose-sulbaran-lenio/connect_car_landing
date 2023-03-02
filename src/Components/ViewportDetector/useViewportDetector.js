import { useState, useEffect, useRef } from "react";
import { useEffectOnce } from "../../utils";

export function useViewportDetector(offset = 0) {
  const [inViewport, setInViewport] = useState(false);
  const [direction, setDirection] = useState("none");
  const ref = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffectOnce(() => {
    if (!("IntersectionObserver" in window)) {
      setIsSupported(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewport(true);
        } else {
          setDirection(entry.boundingClientRect.top < 0 ? "up" : "down");
          setInViewport(false);
        }
      },
      {
        root: null,
        rootMargin: `${offset}px 0px 0px 0px`,
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [offset]);

  return [ref, inViewport, direction, isSupported];
}
