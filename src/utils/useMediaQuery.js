import { useState, useEffect } from "react";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mediaQueryList;
    let updateMatches;

    if (typeof window !== "undefined") {
      mediaQueryList = window.matchMedia(query);
      updateMatches = () => setMatches(mediaQueryList.matches);
      updateMatches();
      mediaQueryList.addEventListener("change", updateMatches);
    } else {
      // For SSR, use a dummy media query list that always matches
      mediaQueryList = {
        matches: true,
        addEventListener: () => {},
        removeEventListener: () => {},
      };
      updateMatches = () => {};
    }

    return () => mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};

export default useMediaQuery;
