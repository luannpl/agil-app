import { useEffect, useState } from "react";

function useBreakpoint() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width >= 1536) return "2xl";
  if (width >= 1024) return "lg";
  return "sm";
}

export default useBreakpoint;
