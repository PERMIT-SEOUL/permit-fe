import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => getIsMobile(breakpoint));

  useEffect(() => {
    const update = () => setIsMobile(getIsMobile(breakpoint));
    const throttledUpdate = throttle(update, 100);

    window.addEventListener("resize", throttledUpdate);

    return () => window.removeEventListener("resize", throttledUpdate);
  }, [breakpoint]);

  return isMobile;
};

function getIsMobile(breakpoint: number) {
  if (typeof window === "undefined") return false;

  return window.innerWidth < breakpoint;
}

function throttle(func: () => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;

  return () => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func();
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay - (currentTime - lastExecTime));
    }
  };
}
