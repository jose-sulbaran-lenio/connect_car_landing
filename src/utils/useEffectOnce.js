import { useEffect } from "react";

export const useEffectOnce = (effect, dependencies) => {
  let ignore = false;

  useEffect(() => {
    if (!ignore) {
      effect();
    }

    return () => {
      ignore = true;
    };
  }, dependencies);
};
